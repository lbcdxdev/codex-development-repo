// SPDX-License-Identifier: GPL-2.0-or-later

import { createApp, h } from "vue";
import { useDialogManager, CdxDialogManager, CdxButton } from "./codex.min.js";

let App = createApp({
  created() {
    this.dialogMgr = useDialogManager();
  },
  data() {
    return {
      alertClosed: 0,
      confirmChoice: null,
      promptAnswer: null,
    };
  },
  render() {
    let self = this;
    return [
      h(CdxDialogManager),
      h(
        CdxButton,
        {
          onClick() {
            self.dialogMgr
              .alert(
                h("strong", "Message content (May be VNode or text)"),
                "Customizable button label",
              )
              .then(function () {
                self.alertClosed++;
              });
          },
        },
        "Open alert",
      ),
      h("span", `You were closed dialog ${self.alertClosed} times`),
      h("br"),
      h(
        CdxButton,
        {
          onClick() {
            self.dialogMgr
              .confirm(
                h("strong", "Message content (May be VNode or text)"),
                "Customizable yes button label",
                "Customizable no button label",
              )
              .then(function () {
                self.confirmChoice = true;
              })
              .catch(function () {
                self.confirmChoice = false;
              });
          },
        },
        "Open confirm",
      ),
      h(
        "span",
        `You clicked: ${self.confirmChoice == null ? "<YOU WERE NOT OPENED THE DIALOG ANYTIME>" : self.confirmChoice ? "Yes" : "No"}`,
      ),
      h("br"),
      h(
        CdxButton,
        {
          onClick() {
            self.dialogMgr
              .prompt(
                h("strong", "Message content (May be VNode or text)"),
                "Customizable label",
                "Customizable placeholder",
              )
              .then(function (ans) {
                self.promptAnswer = ans;
              });
          },
        },
        "Open prompt",
      ),
      h(
        "span",
        `You answered: ${self.promptAnswer ?? "<YOU WERE NOT OPENED THE DIALOG ANYTIME>"}`,
      ),
      h("footer", [
        h("center", [
          h("span", "This demo is based on "),
          h(
            "a",
            { href: "https://app.unpkg.com/@wikimedia/codex@2.6.0/" },
            "Codex v2.6.0",
          ),
        ]),
        h("center", [
          h("span", "Extension was made by Les4353 ("),
          h(
            "a",
            { href: "https://gerrit.wikimedia.org/r/dashboard/13503" },
            "Gerrit",
          ),
          h("span", " | "),
          h(
            "a",
            { href: "https://phabricator.wikimedia.org/p/Les4353/" },
            "Phabricator",
          ),
          h("span", ")"),
        ]),
        h("center", [
          h("span", "This is the minimal prototype demo of "),
          h(
            "a",
            { href: "https://phabricator.wikimedia.org/T402356" },
            "T402356",
          ),
        ]),
      ]),
    ];
  },
});

App.mount("#app");
