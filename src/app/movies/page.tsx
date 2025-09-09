import { Metadata } from "next";

import { MoviesList } from "@/features/movies/components/MoviesList";

export const metadata: Metadata = {
  title: "StreamCore - Movies",
  description: "StreamCore - Movies, TV shows, and more",
};

export default function MoviesPage() {
  return <MoviesList />;
}
