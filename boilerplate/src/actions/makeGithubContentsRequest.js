const userName = `richardsnider`;
const rootFolderUrl = `https://api.github.com/repos/${window.env.GITHUB_USERNAME}/${window.env.GITHUB_USERNAME}.github.io/contents`;

/**
 * @typedef {Object} GithubResponse
 * @property {('dir'|'file'|'symlink')} type
 * @property {string} download_url
 * @property {sting} html_url
 */

/**
 * 
 * @param {string} path
 * @returns {Promise<Response>}
 */
module.exports = async (path = ``) => fetch(`${rootFolderUrl}/${path}`);
