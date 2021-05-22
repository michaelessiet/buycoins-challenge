
const fullname = document.getElementById("name");
const form = document.getElementById("form");
const error = document.getElementById("error");
const profileimage = document.getElementById("profileimage");
const githubname = document.getElementById("githubname");
const username = document.getElementById("username");
const profiledescription = document.getElementById("profiledescription");
const followers = document.getElementById("followers");
const following = document.getElementById("following");
const stars = document.getElementById("stars");
const repocol = document.getElementById('repocol');
const reponumber = document.getElementById('reponumber')
const repoitem = document.getElementById('repoitem')
const repoitemtitle = document.getElementById('repoitemtitle')
const repoitemtitlelink = document.getElementById('repoitemtitlelink')
const repodesc = document.getElementById('repodesc')
const repolang = document.getElementById('repolang')
const repoupdatetime = document.getElementById('repoupdatetime')
let repolist= []

let jsonresponse;

class GetResponses {
  static async fetchUser(username) {
    return fetch(`https://api.github.com/users/${username}`)
      .then((res) => res.json())
      .then((data) => console.log(data));
  }
}

async function requestUser(user) {
  console.log(process.env.API_KEY)
  const usereg = "michaelessiet";
  fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      'Authorization':
        "Bearer" + " " + `${process.env.API_KEY}`,
      "Content-Type": "application/graphql",
    },
    body: JSON.stringify({
      query: `
        query($loginname: String!){
          user(login: $loginname){
            login
            name
            avatarUrl
            bio
            followers(first: 10) {
              totalCount
            }
            following(last:10){
              totalCount
            }
            starredRepositories{
              totalCount
            }
            repositories(last: 20) {
              edges {
                node {
                  name
                  url
                  stargazerCount
                  forkCount
                  description
                  updatedAt
                  primaryLanguage{
                    name
                  }
                  description
                }
              }
            }
          }
        }`,
      variables: {
        "loginname": user
      },
    }),
  })
    .then((res) => {
      repocol.innerHTML=''
      return res.json()
    })
    .then((data) =>  {
      githubname.innerText = data["data"]["user"]["name"]
      username.innerText = data["data"]["user"]["login"]
      profiledescription.innerText = data["data"]["user"]["bio"]
      followers.innerText = data["data"]["user"]["followers"]['totalCount']
      following.innerText = data["data"]["user"]["following"]['totalCount']
      stars.innerText = data["data"]['user']['starredRepositories']['totalCount']
      profileimage.setAttribute('src', data['data']['user']['avatarUrl'])
      repolist = data["data"]['user']['repositories']['edges']
      reponumber.innerText = repolist.length
      console.log(repolist)
      for(let i= 0; i<repolist.length; i++){
        let listitem = document.createElement('div')

        repoitemtitlelink.innerText = repolist[i]['node']['name']
        repoitemtitlelink.setAttribute('href', repolist[i]['node']['url'])
        repodesc.innerText = repolist[i]['node']['description']
        repoupdatetime.innerText = `Updated on ${new Date(repolist[i]['node']['updatedAt']).toDateString()}`
        console.log(repolist[i]['node']['updatedAt'])

        if( repolist[i]['node']['primaryLanguage'] !== null){
          repolang.innerText = repolist[i]['node']['primaryLanguage']['name']
        }

        if( repolist[i]['node']['primaryLanguage'] == null){
          repolang.innerText = ''
        }

        listitem.innerHTML = repoitem.outerHTML
        repocol.appendChild(listitem) 
      }
    })
}

form.addEventListener("submit", (e) => {
  let messages = [];
  if (name.value === "" || name.value == null || name.value === " ") {
    messages.push("A username is required");
  }

  // GetResponses.fetchUser(document.querySelector("#name").value);
  requestUser(document.querySelector('#name').value)
  e.preventDefault();
});

