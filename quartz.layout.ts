import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
// import { GitHubFlavoredMarkdown } from "./quartz/plugins"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/nitaking",
      Profile: "https://nitaking.omg.lol",
      // TODO:  Add digital garden profile link
      // Profile:
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(
      Component.Explorer({
        title: "Explorer", // title of the explorer component
        folderClickBehavior: "link", // what happens when you click a folder ("link" to navigate to folder page on click or "collapse" to collapse folder on click)
        // folderDefaultState: "collapsed", // default state of folders ("collapsed" or "open")
        useSavedState: false, // whether to use local storage to save "state" (which folders are opened) of explorer
        // Sort order: folders first, then files. Sort folders and files alphabetically
        filterFn: (node) => node.name !== "tags", // filters out 'tags' folder
        // mapFn: undefined,
        // what order to apply functions in
        order: ["filter", "map", "sort"],
      }),
    ),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer(
      Component.Explorer({
        title: "Explorer", // title of the explorer component
        folderClickBehavior: "link", // what happens when you click a folder ("link" to navigate to folder page on click or "collapse" to collapse folder on click)
        // folderDefaultState: "collapsed", // default state of folders ("collapsed" or "open")
        useSavedState: false, // whether to use local storage to save "state" (which folders are opened) of explorer
        // Sort order: folders first, then files. Sort folders and files alphabetically
        filterFn: (node) => node.name !== "tags", // filters out 'tags' folder
        // mapFn: undefined,
        // what order to apply functions in
        order: ["filter", "map", "sort"],
      }),
    )),
  ],
  right: [],
}
