import { renderToStaticMarkup } from "react-dom/server";
import { expect, test } from "vitest";
import Home from "./page";

test("renders the homepage with a link to the Next.js documentation", () => {
  const markup = renderToStaticMarkup(<Home />);

  expect(markup).toMatch(/<main\b/);
  expect(markup).toMatch(
    /<a\b[^>]*href="https:\/\/nextjs\.org\/docs(?:\?[^"]*)?"[^>]*>Documentation<\/a>/,
  );
});
