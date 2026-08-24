import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const repository = process.env.GITHUB_REPOSITORY;
const [owner, repo] = repository ? repository.split('/') : [];
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true' && owner && repo;

export default defineConfig({
  site: process.env.SITE_URL || (owner ? `https://${owner}.github.io` : 'https://example.com'),
  base: isGitHubActions ? `/${repo}/` : '/',
  integrations: [
    starlight({
      title: '个人音乐学习教程',
      description: '从吉他开始，系统学习演奏、声乐、乐理、歌曲分析与布鲁斯口琴。',
      tagline: '听见、理解、演奏，再变成自己的音乐。',
      favicon: '/favicon.svg',
      customCss: ['/src/styles/custom.css'],
      lastUpdated: true,
      disable404Route: true,
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 3,
      },
      locales: {
        root: {
          label: '简体中文',
          lang: 'zh-CN',
        },
      },
      sidebar: [
        {
          label: '从这里开始',
          items: ['course-outline', 'start-here', 'practice-and-progress', 'sources-and-evidence'],
        },
        {
          label: '吉他 · 当前主线',
          items: [
            'guitar',
            'guitar/foundations-and-setup',
            'guitar/positioning-a',
            'guitar/positioning-b',
            'guitar/chords-and-transitions',
            'guitar/first-8-weeks',
            'guitar/rhythm',
            'guitar/technique',
            'guitar/fretboard',
            'guitar/harmony',
            'guitar/stage-b-weeks-9-16',
            'guitar/ear-and-transcription',
            'guitar/acoustic-and-electric',
            'guitar/tone-and-signal-chain',
            'guitar/improvisation-and-arrangement',
          ],
        },
        {
          label: '声乐',
          items: [
            'vocal',
            'vocal/baseline',
            'vocal/safe-practice',
            'vocal/breath-phonation-resonance',
            'vocal/high-notes-and-mix',
            'vocal/soft-singing',
            'vocal/pitch-and-ear',
            'vocal/melody-and-english',
            'vocal/first-8-weeks',
            'vocal/song-application',
          ],
        },
        {
          label: '数学物理乐理',
          items: [
            'theory',
            'theory/measurement-and-hearing',
            'theory/sound-and-harmonics',
            'theory/pitch-and-temperament',
            'theory/intonation-beats',
            'theory/intervals-and-scales',
            'theory/chords-and-harmony',
            'theory/rhythm-and-groove',
            'theory/timbre-spectrum-envelope',
            'theory/form-tension-arrangement',
            'theory/first-8-labs',
          ],
        },
        {
          label: '歌曲练习与分析',
          items: [
            'songs',
            'songs/evidence-and-versioning',
            'songs/workflow',
            'songs/transcription-lab',
            'songs/arrangement-lab',
            'songs/recording-review',
            'songs/dont-look-back-in-anger',
            'songs/falling-slowly',
            'songs/where-weve-been',
            'songs/when-you-sleep',
          ],
        },
        {
          label: '布鲁斯口琴 · A / Bb',
          items: [
            'harmonica',
            'harmonica/baseline',
            'harmonica/instruments-and-keys',
            'harmonica/single-notes-and-breath',
            'harmonica/tone-articulation-hands',
            'harmonica/second-position',
            'harmonica/first-8-weeks',
            'harmonica/bending-and-blues-scale',
            'harmonica/blues-vocabulary',
            'harmonica/twelve-bar-and-phrasing',
            'harmonica/with-guitar',
            'harmonica/care-and-troubleshooting',
          ],
        },
      ],
    }),
  ],
});
