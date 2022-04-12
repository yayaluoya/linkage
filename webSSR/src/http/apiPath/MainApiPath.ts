/**
 * 主api路径
 */
export const MainApiPath = {
    com: {
        test: '/com/test',
        getOneBlog: '/com/getOneBlog',
        getTimeLineBlog: '/com/getTimeLineBlog',
        findBlog: '/com/findBlog',
        addBlogShowNumber: '/com/addBlogShowNumber',
        getAllBlogTab: '/com/getAllBlogTab',
        getOneBlogTab: '/com/getOneBlogTab',
        byTabNamesGetTabs: '/com/byTabNamesGetTabs',
        getAllBC: '/com/getAllBC',
        randomBC: '/com/randomBC',
        findDiary: '/com/findDiary',
        findMemo: '/com/findMemo',
        login: '/com/login',
        loginUser: '/com/loginUser',
        getUser: '/com/getUser',
        getUserMemo: '/com/getUserMemo',
        addBC: '/com/addBC',
        findBC: '/com/findBC',
        getMdHelp: '/com/getMdHelp',
        getContributionY: '/com/getContributionY',
        getContributionList: '/com/getContributionList',
        pageContributionList: '/com/pageContributionList',
        getContributionD: '/com/getContributionD',
        getEmoji: '/com/getEmoji',
    },
    admin: {
        test: '/admin/test',
        stsServer: '/admin/stsServer',
        addBlog: '/admin/addBlog',
        editBlog: '/admin/editBlog',
        addBlogTab: '/admin/addBlogTab',
        editBlogTab: '/admin/editBlogTab',
        remoteBlogTab: '/admin/remoteBlogTab',
        addBC: '/admin/addBC',
        removeBC: '/admin/removeBC',
        getBC: '/admin/getBC',
        addDiary: '/admin/addDiary',
        editDiary: '/admin/editDiary',
        addMemo: '/admin/addMemo',
        editMemo: '/admin/editMemo',
        editMemoPos: '/admin/editMemoPos',
        addUser: '/admin/addUser',
        editUser: '/admin/editUser',
        editUserMemo: '/admin/editUserMemo',
        editUserPassword: '/admin/editUserPassword',
        removeBlogC: '/admin/removeBlogC',
        setUserDeleteState: '/admin/setUserDeleteState',
        outLogin: '/admin/outLogin',
        getUserList: '/admin/getUserList',
    },
    wallhaven: {
        test: '/wallhaven/test',
        page: '/wallhaven/page',
        getImgUrl: '/wallhaven/getImgUrl',
    },
    git: {
        test: '/git/test',
        getGiteeUserInfo: '/git/getGiteeUserInfo',
        getGithubUserInfo: '/git/getGithubUserInfo',
        getGiteePublicRepos: '/git/getGiteePublicRepos',
        getGithubPublicRepos: '/git/getGithubPublicRepos',
    },
    other: {
        test: '/other/test',
        pixelGetData: '/other/pixelGetData',
        pixelEditData: '/other/pixelEditData',
        pixelAddNumber: '/other/pixelAddNumber',
    },
    main: {},
};