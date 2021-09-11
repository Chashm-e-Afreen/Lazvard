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
    window.location.href = window.location.href
  }
