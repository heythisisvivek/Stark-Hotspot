const {app, BrowserWindow, globalShortcut, Menu, MenuItem, Tray, ipcMain} = require("electron");

app.on("ready", () => {
  sH = new BrowserWindow({
    width: 300,
    height: 400,
    resizable: false,
    title: "Stark Hotspot",
    icon: "Image/icon.ico"
  });

  sH.setMenu(null);

  sH.on("closed", () => {

  });

  sH.loadURL(`file://${__dirname}/index.htm`);

  ipcMain.on("hide-me",() => {
    sH.hide();
  })

  ipcMain.on("windowopend",(event) => {
    event.sender.send("close-yourself");

    createsH = new BrowserWindow({
      width: 350,
      height: 300,
      resizable: false,
      title: "Stark Hotspot",
      icon: "Image/icon.ico",
      parent: sH
    });

    createsH.on("closed",() => {
      sH.show();
    })

    createsH.setMenu(null);

    createsH.loadURL(`file://${__dirname}/createsH.htm`);
  })

  const creatingtray = new Tray(`${__dirname}/Image/icon.ico`);

  const ETray = [{
    label: "Show",click() {sH.show();}
  },{
    label: "Exit",click() {app.quit();}
  }]

  const TTray = Menu.buildFromTemplate(ETray);
  creatingtray.setContextMenu(TTray);

  ipcMain.on("hidewindows", (event) => {
    createsH.hide();
  })

  globalShortcut.register("ctrl + r",() => {
    sH.reload();
  })
});
