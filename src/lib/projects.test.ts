import { describe, it, expect } from 'vitest';
import { parseProjectDetail } from './projects';
import wordpressRecords from '../data/wordpress-content.json';

const portfolioProjects = wordpressRecords.filter((d) => d.type === 'portfolio');

describe('parseProjectDetail', () => {
  it('correctly parses Advatix with all metadata, story chapters, testimonial, and gallery', () => {
    const advatix = portfolioProjects.find((p) => p.slug === 'advatix')!;
    expect(advatix).toBeDefined();

    const parsed = parseProjectDetail(advatix, portfolioProjects);

    expect(parsed.title).toBe('ADVATIX');
    expect(parsed.metadata).toEqual([
      { label: 'Client', value: 'Advatix' },
      { label: 'Location', value: 'AIHP Executive Center, Gurgaon' },
      { label: 'Year', value: '2024' },
      { label: 'Capacity', value: '180 Seats' }
    ]);

    expect(parsed.overview.headline).toContain('Redefining Supply Chain Excellence');
    expect(parsed.overview.paragraphs.length).toBeGreaterThan(0);
    expect(parsed.overview.detailImages.length).toBe(3);

    expect(parsed.chapters.length).toBe(2);
    expect(parsed.chapters[0].title).toBe('Fostering Collaboration and Connection');
    expect(parsed.chapters[1].title).toBe('Encouraging Transparency and Flexibility');

    expect(parsed.testimonial).not.toBeNull();
    expect(parsed.testimonial?.author).toBe('Aashish Chhada');
    expect(parsed.testimonial?.role).toBe('CEO & Co-Founder, Advatix APAC');
    expect(parsed.testimonial?.youtubeId).toBe('-gbTOzHDfMo');

    expect(parsed.galleryImages.length).toBe(9);
    expect(parsed.relatedProjects.length).toBe(3);
    expect(parsed.previousProject).toBeDefined();
    expect(parsed.nextProject).toBeDefined();
  });

  it('correctly parses Pioneer BPO without losing metadata', () => {
    const pioneer = portfolioProjects.find((p) => p.slug === 'pioneer-pro')!;
    expect(pioneer).toBeDefined();

    const parsed = parseProjectDetail(pioneer, portfolioProjects);

    expect(parsed.metadata.find((m) => m.label === 'Client')?.value).toBe('Pioneer BPO Solutions');
    expect(parsed.metadata.find((m) => m.label === 'Capacity')?.value).toBe('117 Seats');
    expect(parsed.galleryImages.length).toBe(5);
  });

  it('correctly parses all 14 portfolio projects without crashing', () => {
    for (const project of portfolioProjects) {
      const parsed = parseProjectDetail(project, portfolioProjects);
      expect(parsed.title).toBeTruthy();
      expect(parsed.heroImage).toBeTruthy();
      expect(parsed.metadata.length).toBeGreaterThanOrEqual(3);
      expect(parsed.overview.headline).toBeTruthy();
      expect(parsed.galleryImages.length).toBeGreaterThanOrEqual(3);
      expect(parsed.relatedProjects.length).toBe(3);
    }
  });
});
