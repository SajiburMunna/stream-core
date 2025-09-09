import { Metadata } from "next";

import { ChannelsList } from "@/features/channels/components/ChannelsList";

export const metadata: Metadata = {
  title: "StreamCore - Channels",
  description: "StreamCore - Channels, Live TV streams, movies, and more",
};

export default function ChannelsPage() {
  return <ChannelsList />;
}
