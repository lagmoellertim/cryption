/* eslint import/no-webpack-loader-syntax: off */
import worker from "workerize-loader!./handleFiles.js";

export default worker;