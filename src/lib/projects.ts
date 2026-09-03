import mediaMapData from '../data/project-media.json';

export interface ProjectRecord {
  id: string;
  type: string;
  slug: string;
  path: string;
  title: string;
  image?: string | null;
  description?: string;
  seoTitle?: string;
  contentHtml?: string;
}

export interface ProjectMetaItem {
  label: string;
  value: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
}

export interface ProjectChapter {
  title: string;
  paragraphs: string[];
  images: ProjectImage[];
}

export interface ProjectOverview {
  headline: string;
  paragraphs: string[];
  detailImages: ProjectImage[];
}

export interface ProjectTestimonial {
  quote: string;
  author: string;
  role: string;
  company?: string;
  youtubeId?: string | null;
}

export interface ParsedProject {
  title: string;
  slug: string;
  path: string;
  heroImage: string;
  metadata: ProjectMetaItem[];
  overview: ProjectOverview;
  chapters: ProjectChapter[];
  testimonial: ProjectTestimonial | null;
  galleryImages: ProjectImage[];
  previousProject?: { title: string; path: string; image?: string; location?: string };
  nextProject?: { title: string; path: string; image?: string; location?: string };
  relatedProjects: { title: string; path: string; image?: string; client?: string; location?: string; capacity?: string }[];
}

const mediaMap = mediaMapData as Record<string, { src: string; isDetailCrop?: boolean; alt?: string }[]>;

export function parseProjectDetail(project: ProjectRecord, allProjects: ProjectRecord[]): ParsedProject {
  const source = project.contentHtml || '';

  // 1. Metadata extraction
  const metaMatches = [...source.matchAll(/<h6[^>]*>([\s\S]*?)<\/h6>\s*([\s\S]*?)(?=<h[1-6]|$)/gi)];
  const rawMeta = metaMatches.map((m) => ({
    label: m[1].replace(/<[^>]+>/g, '').trim(),
    value: m[2].replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim()
  })).filter((m) => m.label && m.value);

  const metadata: ProjectMetaItem[] = [];
  const clientItem = rawMeta.find((m) => /client/i.test(m.label));
  const yearItem = rawMeta.find((m) => /year/i.test(m.label));
  const locationItem = rawMeta.find((m) => /location/i.test(m.label));
  const scaleItem = rawMeta.find((m) => /seats|size|budget/i.test(m.label));

  metadata.push({
    label: 'Client',
    value: clientItem?.value || project.title
  });

  if (locationItem) {
    let loc = locationItem.value;
    if (!/gurgaon|gurugram|delhi/i.test(loc)) loc += ', Gurgaon';
    metadata.push({ label: 'Location', value: loc });
  } else {
    metadata.push({ label: 'Location', value: 'Gurgaon, Delhi NCR' });
  }

  if (yearItem) {
    metadata.push({ label: 'Year', value: yearItem.value });
  } else {
    metadata.push({ label: 'Year', value: '2024' });
  }

  if (scaleItem) {
    let lbl = scaleItem.label;
    if (/seats/i.test(lbl)) lbl = 'Capacity';
    else if (/size/i.test(lbl)) lbl = 'Area';
    else if (/budget/i.test(lbl)) lbl = 'Scope';
    let val = scaleItem.value;
    if (/capacity/i.test(lbl) && !/seat/i.test(val)) val += ' Seats';
    metadata.push({ label: lbl, value: val });
  }

  // 2. Testimonial & Video extraction
  let testimonial: ProjectTestimonial | null = null;
  const ytMatch = source.match(/https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/i);
  const youtubeId = ytMatch ? ytMatch[1] : null;

  const quoteMatch = source.match(/(?:I would like to sincerely thank|AIHP has been a reliable partner|At AIHP, excellence is not just a goal)[\s\S]*?(?=<h[1-6]|$)/i);
  if (quoteMatch) {
    const rawQuoteBlock = quoteMatch[0].replace(/<[^>]+>/g, '').replace(/https?:\/\/[^\s]+/g, '').trim();
    const lines = rawQuoteBlock.split('\n').map((l) => l.trim()).filter(Boolean);
    if (lines.length >= 2) {
      const role = lines.pop() || '';
      const author = lines.pop() || '';
      const quote = lines.join(' ');
      testimonial = {
        quote,
        author,
        role,
        company: clientItem?.value || project.title,
        youtubeId
      };
    }
  } else if (youtubeId) {
    testimonial = {
      quote: `Explore how Orange Offices delivered an exceptional workplace tailored for ${project.title}.`,
      author: project.title,
      role: 'Project Walkthrough',
      company: project.title,
      youtubeId
    };
  }

  // 3. Clean source for Story Chapters
  let cleanSource = source;
  cleanSource = cleanSource.replace(/<h3>Project info<\/h3>[\s\S]*?(?=<h2)/i, '');
  cleanSource = cleanSource.replace(/^<h2>Pioneer BPO Solutions<\/h2>/i, '');

  const sectionsRaw = [...cleanSource.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>([\s\S]*?)(?=<h2|$)/gi)];
  const chapters: ProjectChapter[] = [];
  let overview: ProjectOverview = {
    headline: project.title,
    paragraphs: [],
    detailImages: []
  };

  for (let i = 0; i < sectionsRaw.length; i++) {
    const heading = sectionsRaw[i][1].replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim();
    let body = sectionsRaw[i][2];

    if (quoteMatch && body.includes(quoteMatch[0].slice(0, 30))) {
      body = body.replace(quoteMatch[0], '');
    }
    body = body.replace(/https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+[^\s<"]*/gi, '');

    const sectionImages: ProjectImage[] = [...body.matchAll(/<img[^>]*src="([^"]+)"[^>]*>/gi)].map((m) => {
      const srcMatch = m[1];
      const altMatch = m[0].match(/alt="([^"]*)"/i);
      return {
        src: srcMatch,
        alt: (altMatch && altMatch[1]) ? altMatch[1] : `${project.title} Workplace Interior`
      };
    });

    const paragraphs = body
      .replace(/<img[^>]*>/gi, '')
      .replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, '')
      .split(/\r?\n\r?\n|<\/?p>/gi)
      .map((p) => p.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim())
      .filter((p) => p.length > 20);

    if (i === 0) {
      overview = {
        headline: heading,
        paragraphs,
        detailImages: sectionImages.filter((img) => /Artboard-[123]\.webp$/i.test(img.src))
      };
    } else if (paragraphs.length > 0 || sectionImages.length > 0) {
      if (heading !== overview.headline) {
        chapters.push({
          title: heading,
          paragraphs,
          images: sectionImages.filter((img) => !/Artboard-[123]\.webp$/i.test(img.src))
        });
      }
    }
  }

  // 4. Media gallery from project-media.json
  const mediaGallery = mediaMap[project.slug] || [];
  const galleryImages: ProjectImage[] = mediaGallery
    .filter((m) => !m.isDetailCrop)
    .map((m) => ({
      src: m.src,
      alt: m.alt || `${project.title} Workplace Interior`
    }));

  // Ensure hero image is high quality
  const heroImage = project.image || galleryImages[0]?.src || '/brand/orange-offices-logo-white.png';

  // 5. Pagination: previous and next
  const currentIndex = allProjects.findIndex((item) => item.path === project.path);
  const prevProjectRecord = currentIndex > 0 ? allProjects[currentIndex - 1] : allProjects[allProjects.length - 1];
  const nextProjectRecord = currentIndex >= 0 && currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : allProjects[0];

  const previousProject = prevProjectRecord ? {
    title: prevProjectRecord.title,
    path: prevProjectRecord.path,
    image: prevProjectRecord.image || undefined
  } : undefined;

  const nextProject = nextProjectRecord ? {
    title: nextProjectRecord.title,
    path: nextProjectRecord.path,
    image: nextProjectRecord.image || undefined
  } : undefined;

  // 6. Related projects: 3 distinct projects
  const otherProjects = allProjects.filter((item) => item.path !== project.path);
  const rotated = otherProjects.slice(currentIndex).concat(otherProjects.slice(0, currentIndex));
  const relatedProjects = rotated.slice(0, 3).map((item) => {
    const locMatch = item.contentHtml?.match(/<h6>Location<\/h6>\s*([\s\S]*?)(?=<h[1-6]|$)/i);
    const seatsMatch = item.contentHtml?.match(/<h6>Seats<\/h6>\s*([\s\S]*?)(?=<h[1-6]|$)/i);
    let loc = locMatch ? locMatch[1].replace(/<[^>]+>/g, '').trim() : 'Gurgaon';
    if (!/gurgaon|gurugram|delhi/i.test(loc)) loc += ', Gurgaon';
    const seats = seatsMatch ? `${seatsMatch[1].replace(/<[^>]+>/g, '').trim()} Seats` : undefined;

    return {
      title: item.title,
      path: item.path,
      image: item.image || undefined,
      client: item.title,
      location: loc,
      capacity: seats
    };
  });

  return {
    title: project.title,
    slug: project.slug,
    path: project.path,
    heroImage,
    metadata,
    overview,
    chapters,
    testimonial,
    galleryImages,
    previousProject,
    nextProject,
    relatedProjects
  };
}
