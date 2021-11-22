async function handleSubmit() {
  const userName = document.querySelector("#userName").value;
  const user = document.querySelector("#username").value;
  if (user !== userName) {
    document.querySelector("#name").innerText = "";
    document.querySelector("#username").innerText = "";
    document.querySelector("#avatar").src = "";
    document.querySelector("#avatar").alt = "";
    document.querySelector("#avatar").height = "";
    document.querySelector("#followers").innerText = "";
    document.querySelector("#repo_count").innerText = "";
    document.querySelector("ul").innerText = "";
    document.querySelector("#err").innerText = "";
  }
  try {
    const data = await Promise.all([
      await fetch(`https://api.github.com/users/${userName}`),
      await fetch(`https://api.github.com/users/${userName}/repos`),
    ]);
    const user = await data[0].json();
    const repos = await data[1].json();

    if (!data[0].ok) {
      const err = document.querySelector("#err");
      err.innerHTML = user.message || "Something went wrong, PLease try again.";
      err.classList.replace("hidden", "visible");
    } else {
      document.querySelector("#name").innerText = `Name: ${user.name}`;
      document.querySelector("#username").innerText = `Username: ${user.login}`;
      document.querySelector("#avatar").src = user.avatar_url;
      document.querySelector("#avatar").alt = "user avatar_url";
      document.querySelector("#avatar").width = "150";
      document.querySelector("#avatar").height = "150";
      document.querySelector(
        "#followers"
      ).innerText = `Followers: ${user.followers}`;
      document.querySelector(
        "#repo_count"
      ).innerText = `Total Public Repository: ${user.public_repos}`;
      console.log(user);
      if (repos && repos.length > 0) {
        repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        const four_latest_repos = repos.slice(0, 4);

        const list = document.querySelector("#repos");
        const h4 = document.createElement("h4");
        h4.innerText = "Latest Repositories";
        list.appendChild(h4);
        four_latest_repos.forEach((repo) => {
          let li = document.createElement("LI");
          let anchor = document.createElement("a");
          li.textContent = repo.name;
          anchor.href = repo.clone_url;
          anchor.target = "_blank";
          anchor.appendChild(li);
          list.appendChild(anchor);
        });
      }
    }
    //   console.log(repos);
  } catch (error) {
    const err = document.querySelector("#err");
    err.innerHTML = error.message || "Something went wrong, PLease try again.";
    err.classList.replace("hidden", "visible");
    console.log("error", error);
  }
}
