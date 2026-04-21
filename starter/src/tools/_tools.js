import getComments from './getComments';
import login from './login';
import logout from './logout';
import createComment from './createComment';

export async function getToolDefs() {
    return [
        {
            handler: getComments,
            schema: {
                type: "function",
                name: "get_comments",
                description: "Gets the latest comments on BadgerChat Mini's single comment board. Optionally limit the result to the n most recent comments.",
                parameters: {
                    type: "object",
                    properties: {
                        n: { type: "integer", description: "Optional maximum number of comments to return (1-10). If omitted, returns the default list." }
                    }
                }
            }
        },
        {
            handler: login,
            schema: {
                type: "function",
                name: "login",
                description: "Request a login. Do not collect credentials in chat — this tool will respond with an instruction to direct the user to the Login button.",
                parameters: { type: "object", properties: {} }
            }
        },
        {
            handler: logout,
            schema: {
                type: "function",
                name: "logout",
                description: "Request a logout. Do not log the user out in chat — this tool will respond with an instruction to direct the user to the Logout button.",
                parameters: { type: "object", properties: {} }
            }
        },
        {
            handler: createComment,
            schema: {
                type: "function",
                name: "create_comment",
                description: "Posts a new comment to BadgerChat Mini. Only requires a comment body. The user must be logged in.",
                parameters: {
                    type: "object",
                    properties: {
                        comment: { type: "string", description: "The body of the comment (max 512 characters)." }
                    },
                }
            }
        }
    ];
}