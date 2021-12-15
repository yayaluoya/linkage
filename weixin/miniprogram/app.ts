// app.ts
App<IAppOption & {
  towxml: any,
}>({
  towxml: require('/towxml/index'),
  globalData: {},
  onLaunch() {
    //
  },
})