import { http, HttpHandler, HttpResponse } from "msw";
import { API_URL } from "@common/consts";

// handler for members 
const members = [
    { username: "user1", role: "admin", lastActive: "2021-08-01" },
    { username: "user2", role: "member", lastActive: "2021-08-01" },
    { username: "user3", role: "contributor", lastActive: "2021-08-01" },
    { username: "user4", role: "admin", lastActive: "2021-08-01" },
    { username: "user5", role: "member", lastActive: "2021-08-01" },
    { username: "user6", role: "contributor", lastActive: "2021-08-01" },
    { username: "user7", role: "admin", lastActive: "2021-08-01" },
    { username: "user8", role: "member", lastActive: "2021-08-01" },
    { username: "user9", role: "contributor", lastActive: "2021-08-01" },
    { username: "user10", role: "admin", lastActive: "2021-08-01" },
    { username: "user11", role: "member", lastActive: "2021-08-01" },
    { username: "user12", role: "contributor", lastActive: "2021-08-01" },
    { username: "user13", role: "admin", lastActive: "2021-08-01" },
    { username: "user14", role: "member", lastActive: "2021-08-01" },
    { username: "user15", role: "contributor", lastActive: "2021-08-01" },
    { username: "user16", role: "admin", lastActive: "2021-08-01" },
    { username: "user17", role: "member", lastActive: "2021-08-01" },
    { username: "user18", role: "contributor", lastActive: "2021-08-01" },
    { username: "user19", role: "admin", lastActive: "2021-08-01" },
]

export const membersHandlers: HttpHandler[] = [
  http.get(`${API_URL}/members/:page`, async ({ params, request }) => {
    const requestParams = await params;
    const page = requestParams.page;
    const url = new URL(request.url);
    const search = url.searchParams.get("search");

    const firstNineItems = members.slice(0, 9);
    const followingNine = members.slice(9, 18);

    if (!search) {
      return HttpResponse.json({
        members: page == "1" ? firstNineItems : followingNine,
        count: page == "1" ? firstNineItems.length : followingNine.length,
        remainingCount: page == "1" ? followingNine.length : 0,
      });
    }

    const filteredMembers = members.filter((member) =>
      member.username.toLowerCase().includes(search.toLowerCase())
    );
    return HttpResponse.json({
      members: filteredMembers,
      count: filteredMembers.length,
      remainingCount: filteredMembers.length,
    });
  }),
  http.post(`${API_URL}/members`, async ({ request }) => {
    const requestData = await request.json();
    const data = requestData as { username: string; role: string; lastActive: string };
    console.log(
      `POST members sent , request:  ${JSON.stringify(requestData)}`
    );
    members.push(data);
    console.log(members.length);
    return HttpResponse.json(
      {
        username: "string",
        role: "string",
        lastActive: "string",
      });
  }),
];