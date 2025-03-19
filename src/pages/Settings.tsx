
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { Bell, Globe, Key, Lock, Shield, User } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const profileFormSchema = z.object({
  username: z.string().min(2, { message: "Username must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  bio: z.string().max(160).optional(),
  phoneNumber: z.string().optional(),
});

const notificationsSchema = z.object({
  emailNotifications: z.boolean().default(true),
  smsNotifications: z.boolean().default(false),
  marketingEmails: z.boolean().default(false),
  securityAlerts: z.boolean().default(true),
});

const appearanceSchema = z.object({
  theme: z.enum(["light", "dark", "system"], {
    required_error: "Please select a theme.",
  }),
  fontSize: z.enum(["small", "medium", "large"], {
    required_error: "Please select a font size.",
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;
type NotificationFormValues = z.infer<typeof notificationsSchema>;
type AppearanceFormValues = z.infer<typeof appearanceSchema>;

const Settings: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Profile form
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: "property_manager",
      email: "manager@example.com",
      bio: "Property manager with 5 years of experience.",
      phoneNumber: "+254712345678",
    },
  });

  // Notifications form
  const notificationsForm = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationsSchema),
    defaultValues: {
      emailNotifications: true,
      smsNotifications: false,
      marketingEmails: false,
      securityAlerts: true,
    },
  });

  // Appearance form
  const appearanceForm = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceSchema),
    defaultValues: {
      theme: "system",
      fontSize: "medium",
    },
  });

  function onProfileSubmit(data: ProfileFormValues) {
    setIsLoading(true);
    setTimeout(() => {
      console.log(data);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
      setIsLoading(false);
    }, 1000);
  }

  function onNotificationsSubmit(data: NotificationFormValues) {
    setIsLoading(true);
    setTimeout(() => {
      console.log(data);
      toast({
        title: "Notifications settings updated",
        description: "Your notification preferences have been saved.",
      });
      setIsLoading(false);
    }, 1000);
  }

  function onAppearanceSubmit(data: AppearanceFormValues) {
    setIsLoading(true);
    setTimeout(() => {
      console.log(data);
      toast({
        title: "Appearance settings updated",
        description: "Your appearance preferences have been saved.",
      });
      setIsLoading(false);
    }, 1000);
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <main className="flex-1 p-4 md:p-6 lg:p-8 pb-16">
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Settings</h1>
              <p className="text-muted-foreground">
                Manage your account settings and preferences.
              </p>
            </div>

            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="mb-8 grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:max-w-3xl">
                <TabsTrigger value="profile" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Profile</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  <span className="hidden sm:inline">Notifications</span>
                </TabsTrigger>
                <TabsTrigger value="appearance" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span className="hidden sm:inline">Appearance</span>
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span className="hidden sm:inline">Security</span>
                </TabsTrigger>
                <TabsTrigger value="api-keys" className="flex items-center gap-2">
                  <Key className="h-4 w-4" />
                  <span className="hidden sm:inline">API Keys</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Profile</h3>
                    <p className="text-sm text-muted-foreground">
                      This is how others will see you on the platform.
                    </p>
                  </div>
                  <Form {...profileForm}>
                    <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-8">
                      <FormField
                        control={profileForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input placeholder="Username" {...field} />
                            </FormControl>
                            <FormDescription>
                              This is your public display name.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={profileForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="Email" type="email" {...field} />
                            </FormControl>
                            <FormDescription>
                              We'll never share your email with anyone else.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={profileForm.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="Phone Number" {...field} />
                            </FormControl>
                            <FormDescription>
                              Used for two-factor authentication and notifications.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={profileForm.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us a little bit about yourself"
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Brief description for your profile. Maximum 160 characters.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save changes"}
                      </Button>
                    </form>
                  </Form>
                </div>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Notification Preferences</h3>
                    <p className="text-sm text-muted-foreground">
                      Configure how you receive notifications.
                    </p>
                  </div>
                  <Form {...notificationsForm}>
                    <form onSubmit={notificationsForm.handleSubmit(onNotificationsSubmit)} className="space-y-8">
                      <div className="space-y-4">
                        <FormField
                          control={notificationsForm.control}
                          name="emailNotifications"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Email Notifications</FormLabel>
                                <FormDescription>
                                  Receive notifications via email.
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={notificationsForm.control}
                          name="smsNotifications"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">SMS Notifications</FormLabel>
                                <FormDescription>
                                  Receive notifications via SMS.
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={notificationsForm.control}
                          name="marketingEmails"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Marketing Emails</FormLabel>
                                <FormDescription>
                                  Receive emails about new features and updates.
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={notificationsForm.control}
                          name="securityAlerts"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Security Alerts</FormLabel>
                                <FormDescription>
                                  Receive emails for important security updates.
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save preferences"}
                      </Button>
                    </form>
                  </Form>
                </div>
              </TabsContent>

              <TabsContent value="appearance" className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Appearance</h3>
                    <p className="text-sm text-muted-foreground">
                      Customize how the application looks.
                    </p>
                  </div>
                  <Form {...appearanceForm}>
                    <form onSubmit={appearanceForm.handleSubmit(onAppearanceSubmit)} className="space-y-8">
                      <FormField
                        control={appearanceForm.control}
                        name="theme"
                        render={({ field }) => (
                          <FormItem className="space-y-1">
                            <FormLabel>Theme</FormLabel>
                            <FormDescription>
                              Select a theme for the dashboard.
                            </FormDescription>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2"
                              >
                                <FormItem>
                                  <FormLabel className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary">
                                    <FormControl>
                                      <RadioGroupItem value="light" className="sr-only" />
                                    </FormControl>
                                    <span className="mt-1 block text-center">Light</span>
                                  </FormLabel>
                                </FormItem>
                                <FormItem>
                                  <FormLabel className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary">
                                    <FormControl>
                                      <RadioGroupItem value="dark" className="sr-only" />
                                    </FormControl>
                                    <span className="mt-1 block text-center">Dark</span>
                                  </FormLabel>
                                </FormItem>
                                <FormItem>
                                  <FormLabel className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary">
                                    <FormControl>
                                      <RadioGroupItem value="system" className="sr-only" />
                                    </FormControl>
                                    <span className="mt-1 block text-center">System</span>
                                  </FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={appearanceForm.control}
                        name="fontSize"
                        render={({ field }) => (
                          <FormItem className="space-y-1">
                            <FormLabel>Font Size</FormLabel>
                            <FormDescription>
                              Select your preferred font size.
                            </FormDescription>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2"
                              >
                                <FormItem>
                                  <FormLabel className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary">
                                    <FormControl>
                                      <RadioGroupItem value="small" className="sr-only" />
                                    </FormControl>
                                    <span className="mt-1 block text-center text-sm">Small</span>
                                  </FormLabel>
                                </FormItem>
                                <FormItem>
                                  <FormLabel className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary">
                                    <FormControl>
                                      <RadioGroupItem value="medium" className="sr-only" />
                                    </FormControl>
                                    <span className="mt-1 block text-center">Medium</span>
                                  </FormLabel>
                                </FormItem>
                                <FormItem>
                                  <FormLabel className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary">
                                    <FormControl>
                                      <RadioGroupItem value="large" className="sr-only" />
                                    </FormControl>
                                    <span className="mt-1 block text-center text-lg">Large</span>
                                  </FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save preferences"}
                      </Button>
                    </form>
                  </Form>
                </div>
              </TabsContent>

              <TabsContent value="security" className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Security Settings</h3>
                    <p className="text-sm text-muted-foreground">
                      Manage your account security settings.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div>
                          <h4 className="font-medium">Change Password</h4>
                          <p className="text-sm text-muted-foreground">
                            Update your password for enhanced security.
                          </p>
                        </div>
                        <Button variant="outline" className="w-full sm:w-auto">Change</Button>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div>
                          <h4 className="font-medium">Two-Factor Authentication</h4>
                          <p className="text-sm text-muted-foreground">
                            Add an extra layer of security to your account.
                          </p>
                        </div>
                        <Button variant="outline" className="w-full sm:w-auto">Enable</Button>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div>
                          <h4 className="font-medium">Session Management</h4>
                          <p className="text-sm text-muted-foreground">
                            Manage active sessions and sign out from other devices.
                          </p>
                        </div>
                        <Button variant="outline" className="w-full sm:w-auto">Manage</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="api-keys" className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">API Keys</h3>
                    <p className="text-sm text-muted-foreground">
                      Manage your API keys for integrations.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div></div>
                      <Button className="w-full sm:w-auto">
                        <Key className="mr-2 h-4 w-4" />
                        Generate New API Key
                      </Button>
                    </div>
                    <div className="rounded-lg border">
                      <div className="p-4 border-b">
                        <h4 className="font-medium">Your API Keys</h4>
                      </div>
                      <div className="p-4 text-center text-muted-foreground">
                        No API keys generated yet. Generate a key to get started.
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Settings;
