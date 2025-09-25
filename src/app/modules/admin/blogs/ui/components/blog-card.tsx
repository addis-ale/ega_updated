"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Eye } from "lucide-react";
import { BlogData } from "../../types";
import Link from "next/link";

interface AdminPostCardProps {
  post: BlogData[number];
}

export function AdminBlogCard({ post }: AdminPostCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = () => {
    if (post.isPublished === null) {
      return <Badge variant="secondary">Draft</Badge>;
    }
    return post.isPublished ? (
      <Badge variant="default" className="bg-green-600 hover:bg-green-700">
        Published
      </Badge>
    ) : (
      <Badge variant="destructive">Unpublished</Badge>
    );
  };

  const truncateContent = (content: string | null, maxLength = 120) => {
    if (!content) return "No content available";
    return content.length > maxLength
      ? `${content.substring(0, maxLength)}...`
      : content;
  };

  return (
    <Card className="w-full max-w-md hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold text-pretty line-clamp-2">
            {post.title || "Untitled Post"}
          </CardTitle>
          {getStatusBadge()}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {truncateContent(post.content)}
        </p>

        <div className="space-y-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-3 w-3" />
            <span>Created: {formatDate(post.createdAt)}</span>
          </div>

          {post.updatedAt !== post.createdAt && (
            <div className="flex items-center gap-2">
              <Calendar className="h-3 w-3" />
              <span>Updated: {formatDate(post.updatedAt)}</span>
            </div>
          )}
        </div>

        <div className="pt-2">
          <Link href={`/admin/blogs/new/${post.id}`}>
            <Button
              variant="outline"
              size="sm"
              className="w-full bg-transparent"
            >
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
