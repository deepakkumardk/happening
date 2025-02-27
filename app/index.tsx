import React from "react";
import { Redirect } from "expo-router";

function IndexScreen() {
  return <Redirect href={"/login"} />;
}

export default IndexScreen;
