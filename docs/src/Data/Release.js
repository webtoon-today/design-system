import { Octokit } from 'octokit';

const octokit = new Octokit({});

/**
 * @typedef {{
 *  title: string,
 *  body: string,
 *  githubUrl: string,
 *  branch: string,
 *  updatedAt: string
 * }} ReleaseNote
 */

/**
 * 
 * @returns {Promise<ReleaseNote[] | null>}
 */
export const getReleaseNote = async () => {
    try {
        const res = await octokit.request('GET /repos/{owner}/{repo}/pulls?state=all', {
            owner: 'webtoon-today',
            repo: 'design-system',
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });

        if (res.status !== 200) {
            return null;
        };
        
        const releaseLogList = res.data.filter((pull) => 
            pull.labels.some((label) => label.name === 'release note')
        ).map((release) => ({
            title: release.title,
            body: release.body,
            githubUrl: release.html_url,
            branch: release.head.ref,
            updatedAt: release.updated_at
        }));
        
        return releaseLogList;
    } catch (error) {
        console.error(error);
        return null;
    }
}