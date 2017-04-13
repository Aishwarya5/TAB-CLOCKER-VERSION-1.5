function handleCreated(tab) {
  console.log("the created tab id is "+tab.id);

var updating = browser.tabs.update({url: "clock.html"});
updating.then(onUpdated, onError);
}

browser.tabs.onCreated.addListener(handleCreated);

function onUpdated(tab) {
  console.log(`Updated tab: ${tab.id}`);
}

function onError(error) {
  console.log(`Error: ${error}`);
}
