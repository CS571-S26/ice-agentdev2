export default async function getComments(args) {
    const url = (args.n !== null && args.n > 0)
        ? `https://cs571api.cs.wisc.edu/rest/s26/ice/comments?num=${args.n}`
        : "https://cs571api.cs.wisc.edu/rest/s26/ice/comments";
    const resp = await fetch(url, {
        headers: { "X-CS571-ID": CS571.getBadgerId() }
    });
    const comments = await resp.json();
    return comments;
}
