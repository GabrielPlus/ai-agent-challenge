if (!process.env.CLERK_ISSUE_URL) {
    throw new Error("CHECK CLERK_ISSUE_URL");
}

const authConfig = {
    providers: [
        {
            domain: process.env.CLERK_ISSUE_URL,
            applicationID: "convex",
        },
    ],
};

export default authConfig;