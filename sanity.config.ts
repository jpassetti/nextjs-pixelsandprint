import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";

import { schemaTypes } from "./sanity/schemaTypes";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

if (!projectId) {
 throw new Error("Missing env: NEXT_PUBLIC_SANITY_PROJECT_ID");
}
if (!dataset) {
 throw new Error("Missing env: NEXT_PUBLIC_SANITY_DATASET");
}

export default defineConfig({
 name: "default",
 title: "Pixels & Print",
 basePath: "/studio",
 projectId,
 dataset,
 plugins: [
  deskTool({
	structure: (S) =>
	 S.list()
	  .title("Content")
	  .items([
		S.documentTypeListItem("workshopYear").title("Workshop Years"),
		S.divider(),
		S.documentTypeListItem("coach").title("Coaches"),
		S.documentTypeListItem("sponsor").title("Sponsors"),
		S.documentTypeListItem("location").title("Locations"),
		S.documentTypeListItem("workItem").title("Work Timeline Items"),
	  ]),
  }),
 ],
 schema: { types: schemaTypes },
});
