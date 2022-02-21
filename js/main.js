document
  .querySelector("#searchInputBox")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    var query = document.querySelector("#searchInputBox > input").value.trim();

    if (query.startsWith("https://") || query.startsWith("http://")) {
      window.location.href = query;
      window.open(query, "_self");
      return;
    } else {
      var link = "https://www.google.com/search?q=" + query;
      window.location.href = link;
      window.open(link, "_self");
      return;
    }
  });

async function loadData() {
  var mainBox = document.getElementById("content");
  mainBox.innerHTML = "";

  await fetch("config.json")
    .then(function (data) {
      return data.json();
    })
    .then(function (resp) {
      resp.categories.forEach((category) => {
        var category_box = document.createElement("div");
        category_box.className = "category";

        var category_title = document.createElement("span");
        category_title.className = "title";
        category_title.innerText = category.category;
        category_box.appendChild(category_title);

        var category_websites_box = document.createElement("div");
        category_websites_box.className = "websites";

        category.websites.forEach((site) => {
          var site_box = document.createElement("a");
          site_box.className = "site";
          site_box.href = site.link;

          var site_image = document.createElement("img");
          site_image.className = "site_logo";
          site_image.src = site.image;
          site_box.appendChild(site_image);

          var site_name = document.createElement("span");
          site_name.className = "site_name";
          site_name.innerText = site.name;
          site_box.appendChild(site_name);

          category_websites_box.appendChild(site_box);
        });

        category_box.appendChild(category_websites_box);

        mainBox.appendChild(category_box);
      });
    });
}

loadData();
