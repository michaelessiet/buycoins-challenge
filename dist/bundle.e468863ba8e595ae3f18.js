(()=>{document.getElementById("name");const e=document.getElementById("form"),n=(document.getElementById("error"),document.getElementById("profileimage")),t=document.getElementById("githubname"),o=document.getElementById("username"),r=document.getElementById("profiledescription"),a=document.getElementById("followers"),l=document.getElementById("following"),d=document.getElementById("stars"),i=document.getElementById("repocol"),m=document.getElementById("reponumber"),u=document.getElementById("repoitem"),s=(document.getElementById("repoitemtitle"),document.getElementById("repoitemtitlelink")),g=document.getElementById("repodesc"),p=document.getElementById("repolang"),c=document.getElementById("repoupdatetime");let y=[];e.addEventListener("submit",(e=>{""!==name.value&&null!=name.value&&" "!==name.value||[].push("A username is required"),async function(e){fetch("https://api.github.com/graphql",{method:"POST",headers:{Authorization:"Bearer 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","Content-Type":"application/graphql"},body:JSON.stringify({query:"\n        query($loginname: String!){\n          user(login: $loginname){\n            login\n            name\n            avatarUrl\n            bio\n            followers(first: 10) {\n              totalCount\n            }\n            following(last:10){\n              totalCount\n            }\n            starredRepositories{\n              totalCount\n            }\n            repositories(last: 20) {\n              edges {\n                node {\n                  name\n                  url\n                  stargazerCount\n                  forkCount\n                  description\n                  updatedAt\n                  primaryLanguage{\n                    name\n                  }\n                  description\n                }\n              }\n            }\n          }\n        }",variables:{loginname:e}})}).then((e=>(i.innerHTML="",e.json()))).then((e=>{t.innerText=e.data.user.name,o.innerText=e.data.user.login,r.innerText=e.data.user.bio,a.innerText=e.data.user.followers.totalCount,l.innerText=e.data.user.following.totalCount,d.innerText=e.data.user.starredRepositories.totalCount,n.setAttribute("src",e.data.user.avatarUrl),y=e.data.user.repositories.edges,m.innerText=y.length,console.log(y);for(let e=0;e<y.length;e++){let n=document.createElement("div");s.innerText=y[e].node.name,s.setAttribute("href",y[e].node.url),g.innerText=y[e].node.description,c.innerText=`Updated on ${new Date(y[e].node.updatedAt).toDateString()}`,console.log(y[e].node.updatedAt),null!==y[e].node.primaryLanguage&&(p.innerText=y[e].node.primaryLanguage.name),null==y[e].node.primaryLanguage&&(p.innerText=""),n.innerHTML=u.outerHTML,i.appendChild(n)}}))}(document.querySelector("#name").value),e.preventDefault()}))})();
//# sourceMappingURL=bundle.e468863ba8e595ae3f18.js.map