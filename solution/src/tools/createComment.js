export default async function createComment(args) {
    const resp = await fetch("https://cs571api.cs.wisc.edu/rest/s26/ice/comments", {
        method: "POST",
        credentials: "include",
        headers: {
            "X-CS571-ID": CS571.getBadgerId(),
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ comment: args.comment })
    });
    return await resp.json();
}
