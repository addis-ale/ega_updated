"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Calendar, Eye, EyeOff, Package, Users } from "lucide-react";

export const AdminOverView = () => {
  const trpc = useTRPC();
  const { data: stats } = useSuspenseQuery(
    trpc.overView.overView.queryOptions()
  );
  const overviewCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Products Posted",
      value: stats.totalProductsPosted,
      icon: Package,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Products Draft",
      value: stats.totalProductsDraft,
      icon: Package,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Blogs Published",
      value: stats.totalBlogsPublished,
      icon: Eye,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      title: "Blogs Draft",
      value: stats.totalBlogsDraft,
      icon: EyeOff,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Events Posted",
      value: stats.totalEventsPosted,
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Events Draft",
      value: stats.totalEventsDraft,
      icon: Calendar,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ];
  return (
    <div className="container mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {overviewCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card
              key={card.title}
              className="hover:shadow-md transition-shadow"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </CardTitle>
                <div className={`p-2 rounded-full ${card.bgColor}`}>
                  <Icon className={`h-4 w-4 ${card.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {card.value.toLocaleString()}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
