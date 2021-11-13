import axios from "axios";

export default {
  name: "Reddit Search",
  version: "0.0.10",
  key: "reddit-search",
  description: "",
  props: {
    subreddit: {
      type: "string[]",
    },
    sort: {
      type: "string",
      label: "Sort By",
      options: ["relevance", "hot", "top", "new", "comments"],
      // default: "relevance",
      // enum: ["relevance", "hot", "top", "new", "comments"],
      optional: true,
    },
    search: {
      type: "string",
      optional: true,
    },
    limit: {
      type: "integer",
      optional: true,
    },
    after: {
      type: "string",
      optional: true,
    },
    before: {
      type: "string",
      optional: true,
    },
    t: {
      type: "string",
      options: ["hour", "day", "week", "month", "year", "all"],
      optional: true,
    },
    additionalQueryString: {
      type: "object",
      label: "Additional Query String",
      optional: true,
    },
  },
  type: "action",
  methods: {},
  async run() {
    const SUBREDDIT_LIST = this.subreddit;
    let subreddits = SUBREDDIT_LIST.join("+");

    const BASE_URL = "https://www.reddit.com/r/";
    let subredditUrl = `${BASE_URL}${subreddits}/search/.json`;

    // console.log(this.queryString);
    const LIMIT = this.limit;
    const SORTBY = this.sort;
    const SEARCHSTRING = this.search;
    const BEFORE = this.before;
    const AFTER = this.after;
    const T = this.t;
    const ADDITONAL_QUERY_STRING = this.additionalQueryString;

    let queryparams = {
      restrict_sr: 1,
      raw_json: 1,
      sort: SORTBY,
    };

    if (SEARCHSTRING) {
      queryparams["q"] = SEARCHSTRING;
    } else {
      subredditUrl = `${BASE_URL}${subreddits}/.json`;
    }

    if (LIMIT) {
      queryparams["limit"] = LIMIT;
    }

    if (BEFORE) {
      queryparams["before"] = BEFORE;
    } else if (!LIMIT) {
      queryparams["limit"] = 5;
    }

    if (AFTER) {
      queryparams["after"] = AFTER;
    }

    if (T) {
      queryparams["t"] = T;
    }

    if (ADDITONAL_QUERY_STRING) {
      queryparams = { ...queryparams, ...ADDITONAL_QUERY_STRING };
    }

    // Retrieve the data from the response
    const { data } = await axios.get(subredditUrl, { params: queryparams });
    return data;
  },
};
