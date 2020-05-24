const removeMd = require("remove-markdown");

module.exports = {
    title: 'blog',
    description: '记录日积月累的知识',
    dest: './dist',

    markdown: {
        // lineNumbers: true
    },

    extendPageData: function (pageCtx) {
        const summary = true;
        const summaryLength = 350;

        const strippedContent = pageCtx._strippedContent;
        if (!strippedContent) {
            return;
        }

        const sanitizedContent = strippedContent
            .trim()
            .replace(/^#+\s+(.*)/, "")

        if (summary) {
            pageCtx.summary =
                removeMd(
                    sanitizedContent
                        .slice(0, summaryLength)
                ) + " ...";
        };

        pageCtx.content = removeMd(sanitizedContent)
    },

    plugins: [
        [
            '@vuepress/blog',
            {
                directories: [
                    {
                        // Unique ID of current classification
                        id: 'techLog',
                        // Target directory
                        dirname: '_techLog',
                        // Path of the `entry page` (or `list page`)
                        path: '/tech/',
                        itemLayout: 'TechLog',
                        itemPermalink: '/:year/:month/:day/:slug',
                        pagination: {
                            lengthPerPage: 4,
                        }
                    }
                ],

                frontmatters: [
                    {
                        // Unique ID of current classification
                        id: 'tag',
                        // Decide that the frontmatter keys will be grouped under this classification
                        keys: ['tag'],
                        // Path of the `entry page` (or `list page`)
                        path: '/tag/',
                        // Layout of the `entry page`
                        layout: 'Tags',
                        // Layout of the `scope page`
                        scopeLayout: 'Tag',
                        pagination: {
                            lengthPerPage: 16,
                            layout: 'Tag'
                        }
                    }
                ],

                sitemap: {
                    hostname: 'https://bearcub.club'
                }
            },
        ],

        ['@vuepress/search', {
            searchMaxSuggestions: 10
        }],

        ['@vuepress/back-to-top'],

        ['@vuepress/nprogress'],

        ['@vssue/vuepress-plugin-vssue', {
            platform: 'github',
            owner: 'WuLianN',
            repo: 'blog',
            clientId: 'c61be63f6a6dbe1a8746',
            clientSecret: 'e7d63d31864dc746ed6afb8201af2118ca09be63',
            locale: 'zh'
        }]
    ],
}