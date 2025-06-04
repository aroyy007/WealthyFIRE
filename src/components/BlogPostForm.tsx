import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { blogService, CreateBlogPost } from "@/services/blogService";
import { useAuth } from "@/contexts/AuthContext";

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters"),
  content: z.string().min(50, "Content must be at least 50 characters"),
  category: z.string().min(1, "Please select a category"),
  image_url: z.string().url("Please enter a valid image URL"),
});

interface BlogPostFormProps {
  onSuccess?: () => void;
  initialData?: CreateBlogPost;
  isEditing?: boolean;
  postId?: number;
}

const BlogPostForm = ({ onSuccess, initialData, isEditing = false, postId }: BlogPostFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      title: "",
      excerpt: "",
      content: "",
      category: "",
      image_url: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to create a blog post",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      if (isEditing && postId) {
        await blogService.updatePost(postId, values, user.id);
        toast({
          title: "Blog post updated",
          description: "Your blog post has been updated successfully",
        });
      } else {
        await blogService.createPost(values, user.id);
        toast({
          title: "Blog post created",
          description: "Your blog post has been published successfully",
        });
        form.reset();
      }
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = [
    "Investing",
    "Lifestyle",
    "Analysis",
    "Psychology",
    "Taxes",
    "Passive Income",
    "Retirement",
    "Budgeting",
  ];

  return (
    <Card className="bg-softdark border-platinum/20">
      <CardHeader>
        <CardTitle className="text-platinum">
          {isEditing ? "Edit Blog Post" : "Create New Blog Post"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-platinum">Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter a catchy title"
                      className="input-dark"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-platinum">Excerpt</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write a brief summary of your post"
                      className="input-dark min-h-[80px]"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-platinum">Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your blog post content here"
                      className="input-dark min-h-[200px]"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-platinum">Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isSubmitting}
                    >
                      <FormControl>
                        <SelectTrigger className="input-dark">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-platinum">Image URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter image URL"
                        className="input-dark"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <CardFooter className="px-0 pt-6">
              <Button
                type="submit"
                className="gold-button w-full"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? isEditing
                    ? "Updating..."
                    : "Publishing..."
                  : isEditing
                  ? "Update Post"
                  : "Publish Post"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default BlogPostForm;