let XMLHttpRequestOpen = XMLHttpRequest.prototype.open;
let XMLHttpRequestSend = XMLHttpRequest.prototype.send;
let XMLHttpRequestsetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;
let patched = false;
let db = [];
let running = false;
let stats;
let lastCursor = null;
let initUI = () => {
  let uiId = "fb-scrapper";
  let scrapBtnId = "fb-scrapper-start-btn";
  let ui = document.getElementById(uiId);

  if (!ui) {
    //main ui
    ui = document.createElement("div");
    ui.id = uiId;
    document.body.appendChild(ui);

    //title
    title = document.createElement("h1");
    title.classList.add("title");
    title.innerHTML = "FBG  SCRAPER v0.2";
    ui.appendChild(title);

    //play button
    let scrapBtn = document.createElement("a");
    scrapBtn.id = scrapBtnId;
    scrapBtn.addEventListener("click", () => {
      scrapBtn.classList.toggle("active");
    });
    ui.appendChild(scrapBtn);
    //stats
    stats = document.createElement("h1");
    stats.classList.add("title");
    stats.innerHTML = "SCRAPED:" + db.length;
    ui.appendChild(stats);

    //save btn
    saveBtn = document.createElement("a");
    saveBtn.classList.add("title");
    saveBtn.innerHTML = "SAVE";
    ui.appendChild(saveBtn);

    return { scrapBtn, saveBtn };
  }
};

let patch = (targetURL) => {
  XMLHttpRequest.prototype.open = function (method, url, async, user, pass) {
    XMLHttpRequest.prototype.url = url;
    XMLHttpRequestOpen.call(this, method, url, async, user, pass);
  };
  XMLHttpRequest.prototype.setRequestHeader = function (header, value) {
    // console.log("url from set header",header)
    // this.prototype.headers

    XMLHttpRequestsetRequestHeader.call(this, header, value);

    if (!this.headers) {
      this.headers = {};
    }

    // Create a list for the header that if it does not exist
    if (!this.headers[header]) {
      this.headers[header] = [];
    }

    // Add the value to the header
    this.headers[header].push(value);
  };

  XMLHttpRequest.prototype.send = function (body) {
    console.log("trying to find a valid request");
    // console.log('this',this.url)
    //unpatch()
    if (
      this.url.match(targetURL) &&
      body.match(
        "fb_api_req_friendly_name=GroupsCometMembersPageNewMembersSectionRefetchQuery"
      )
    ) {
      console.log("found and unpatching");
      this.addEventListener(
        "readystatechange",
        () => {
          if (this.readyState == 4) {
            // patchCallback(this.responseText)
            spider(this.url, this.headers, body);
          }
        },
        false
      );

      unpatch();
    }

    XMLHttpRequestSend.call(this, body);
  };

  patched = true;
};
//C:\Users\HP\Desktop\monkyscripts\src\mokeys\fbgroup.js
let spider = (url, headers, body, cursor = null) => {
  let parse = (data) => {
    // console.log("extracting");

    let nextCursor = null;
    try {
      data = JSON.parse(data).data;
      //    console.log("data extracted", data);
      let new_members = data.node.new_members;
      //let next =data.node.new_members
      if (new_members) {
        for (m in new_members.edges) {
          let user = new_members.edges[m].node;
          //  console.log(user);
          db.push({ name: user.name, url: user.url, type: user.__typename });
        }
        if (new_members.page_info.has_next_page) {
          nextCursor = new_members.page_info.end_cursor;
        }
      }
    } catch (e) {
      console.log("catched", e);
    }
    // console.log("scrapped :::", db.length);
    stats.innerHTML = "SCRAPED:" + db.length;
    return nextCursor;
  };

  let changeCursor = (body, cursor) => {
    // console.log("body befor ::", body);
    let params = new URLSearchParams(body);
    let variables = JSON.parse(params.get("variables"));
    variables.cursor = nextCursor;
    variables = JSON.stringify(variables);
    params.set("variables", variables);
    body = params.toString();
    // console.log("body after ::", body);
    // console.log("cursor being chjanged", variables.cursor);
    return body;
  };
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url);
  for (header in headers) {
    xhr.setRequestHeader(header, headers[header]);
  }
  //xhr.setRequestHeader("alooha",5555)

  xhr.onload = function () {
    if (xhr.status === 200) {
      nextCursor = parse(this.responseText);

      //console.log("db", db);
      if (nextCursor && running) {
        body = changeCursor(body, nextCursor);
        spider(url, headers, body);
      }

      //ready for next
    } else {
      console.log("reply errored");
    }
  };

  xhr.send(body);
};

let unpatch = () => {
  XMLHttpRequest.prototype.open = XMLHttpRequestOpen;
  XMLHttpRequest.prototype.send = XMLHttpRequestSend;
  XMLHttpRequest.prototype.setRequestHeader = XMLHttpRequestsetRequestHeader;
  patched = false;
};
let scroll = () => {
  const resizeObserver = new ResizeObserver((entries) => {
    //console.log('Body height changed:', entries[0].target.clientHeight)
    if (patched) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  });

  // start observing a DOM node
  resizeObserver.observe(document.body);
};

let save = (filename = "scrap.txt", type = "text") => {
  console.log("download");

  let data = "";
  for (record in db) {
    //console.log("record :::",db[record])
    let user = db[record];
    data += user.name + ";" + user.url + "\n";
  }
  var file = new Blob([data], { type: type });
  // Others
  var a = document.createElement("a"),
    url = URL.createObjectURL(file);
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(function () {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 0);
};

let run = function () {
  running = true;
  patch("/graphql");
};
let stop = function () {
  unpatch("/graphql");
  running = false;
};

function init() {
  let { scrapBtn, saveBtn } = initUI();

  //  console.log("returned ", scrapBtn, stats,saveBtn)

  scrapBtn.addEventListener("click", () => {
    if (running) {
      stop();
    } else {
      run();
    }
  });

  saveBtn.addEventListener("click", () => {
    save();
  });
}
