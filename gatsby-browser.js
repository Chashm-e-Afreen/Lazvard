// custom typefaces
// import "typeface-montserrat"
// import "typeface-merriweather"
// import "typeface-nunito"
// import "typeface-alegreya"
import "./src/utils/tailwind.css"

export const onServiceWorkerUpdateReady = async (args) => {
    const permissionResponse = await Notification.requestPermission()
    if (permissionResponse === "granted") {
      await args.serviceWorker.showNotification("Website update", {
        body:
          "Our website just got a little bit better. We reloaded the site with the update to ensure a smooth experience for you."
      })
    }
    forceReload()
  }

function forceReload() {
    if(environment.production) {
        const form = document.createElement('form');
        form.method = "POST";
        form.action = location.href;
        document.body.appendChild(form);
        form.submit();
    } else {
        window.location.reload();
    }
}
