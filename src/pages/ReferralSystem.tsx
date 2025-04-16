
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserPlus, Copy, Gift, Mail, Share2, Twitter, Facebook, Linkedin, Link, ChevronRight, Medal } from "lucide-react";
import Header from "@/components/layout/Header";
import { storageService } from "@/services/storageService";

const ReferralSystem: React.FC = () => {
  const { toast } = useToast();
  const [referralCode] = useState(storageService.getReferralCode());
  const [email, setEmail] = useState("");
  const [emailList, setEmailList] = useState<string[]>([]);
  
  // Mock referral stats
  const referralStats = {
    referralsInvited: 12,
    referralsJoined: 5,
    pendingReferrals: 7,
    rendersEarned: 25,
    creditsRemaining: 20
  };
  
  const handleCopyReferralLink = () => {
    const referralLink = `https://aivideoplatform.com/join?ref=${referralCode}`;
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Link copied!",
      description: "Referral link copied to clipboard.",
      duration: 3000,
    });
  };
  
  const handleSendEmailInvite = () => {
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter an email address.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    // In a real implementation, this would send an email
    setEmailList([...emailList, email]);
    setEmail("");
    
    toast({
      title: "Invitation sent!",
      description: `Invited ${email} to join the platform.`,
      duration: 3000,
    });
  };
  
  const handleShareOnSocial = (platform: string) => {
    toast({
      title: `Share on ${platform}`,
      description: "Social sharing will be available in the full version.",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-1">
        <div className="container mx-auto py-8 px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Refer Friends & Earn Rewards</h1>
            <p className="text-lg text-muted-foreground">
              Get 5 free video renders for each friend who joins using your referral link
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <UserPlus className="h-5 w-5 text-primary" /> Invited
                </CardTitle>
              </CardHeader>
              <CardContent className="text-3xl font-bold">
                {referralStats.referralsInvited}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Medal className="h-5 w-5 text-amber-500" /> Joined
                </CardTitle>
              </CardHeader>
              <CardContent className="text-3xl font-bold">
                {referralStats.referralsJoined}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Gift className="h-5 w-5 text-green-500" /> Renders Earned
                </CardTitle>
              </CardHeader>
              <CardContent className="text-3xl font-bold">
                {referralStats.rendersEarned}
              </CardContent>
              <CardFooter className="pt-0 text-sm text-muted-foreground">
                {referralStats.creditsRemaining} credits remaining
              </CardFooter>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Share Your Referral Link</CardTitle>
                <CardDescription>
                  Share this link with friends to earn rewards when they join
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="link">
                  <TabsList className="grid w-full grid-cols-3 mb-8">
                    <TabsTrigger value="link">Referral Link</TabsTrigger>
                    <TabsTrigger value="email">Email Invite</TabsTrigger>
                    <TabsTrigger value="social">Social Media</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="link">
                    <div className="bg-muted/50 p-4 rounded-lg border border-border mb-4">
                      <div className="mb-2 text-sm font-medium">Your unique referral link</div>
                      <div className="flex gap-2">
                        <Input 
                          value={`https://aivideoplatform.com/join?ref=${referralCode}`} 
                          readOnly 
                          className="bg-background"
                        />
                        <Button 
                          onClick={handleCopyReferralLink} 
                          size="icon"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="bg-muted/50 p-4 rounded-lg border border-border">
                      <div className="mb-2 text-sm font-medium">Your referral code</div>
                      <div className="flex gap-2">
                        <Input 
                          value={referralCode} 
                          readOnly 
                          className="bg-background font-mono"
                        />
                        <Button 
                          onClick={() => {
                            navigator.clipboard.writeText(referralCode);
                            toast({
                              title: "Code copied!",
                              description: "Referral code copied to clipboard.",
                              duration: 3000,
                            });
                          }} 
                          size="icon"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="email">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="email">Friend's Email</Label>
                        <div className="flex gap-2 mt-1.5">
                          <Input 
                            id="email" 
                            type="email" 
                            placeholder="friend@example.com" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <Button onClick={handleSendEmailInvite}>
                            <Mail className="h-4 w-4 mr-2" /> Send
                          </Button>
                        </div>
                      </div>
                      
                      {emailList.length > 0 && (
                        <div className="bg-muted/50 p-4 rounded-lg border border-border">
                          <h4 className="text-sm font-medium mb-2">Invited Emails</h4>
                          <ul className="space-y-2">
                            {emailList.map((email, index) => (
                              <li key={index} className="text-sm flex justify-between items-center pb-2 border-b border-border">
                                <span>{email}</span>
                                <span className="text-xs text-muted-foreground">Pending</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="social">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Button 
                          variant="outline" 
                          className="gap-2 flex justify-start"
                          onClick={() => handleShareOnSocial("Twitter")}
                        >
                          <Twitter className="h-5 w-5 text-sky-500" /> 
                          <span className="flex-1 text-left">Share on Twitter</span>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          className="gap-2 flex justify-start"
                          onClick={() => handleShareOnSocial("Facebook")}
                        >
                          <Facebook className="h-5 w-5 text-blue-600" /> 
                          <span className="flex-1 text-left">Share on Facebook</span>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          className="gap-2 flex justify-start"
                          onClick={() => handleShareOnSocial("LinkedIn")}
                        >
                          <Linkedin className="h-5 w-5 text-blue-700" /> 
                          <span className="flex-1 text-left">Share on LinkedIn</span>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          className="gap-2 flex justify-start"
                          onClick={() => handleShareOnSocial("Direct")}
                        >
                          <Link className="h-5 w-5 text-primary" /> 
                          <span className="flex-1 text-left">Direct Message</span>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="bg-muted/50 p-4 rounded-lg border border-border">
                        <h4 className="text-sm font-medium mb-2">Suggested Message</h4>
                        <p className="text-sm text-muted-foreground">
                          I've been creating amazing videos with this AI platform! You can create professional videos in minutes. 
                          Use my referral link to get 5 free renders when you join.
                        </p>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="mt-2 gap-1"
                          onClick={() => {
                            navigator.clipboard.writeText("I've been creating amazing videos with this AI platform! You can create professional videos in minutes. Use my referral link to get 5 free renders when you join.");
                            toast({
                              title: "Message copied!",
                              description: "Suggested message copied to clipboard.",
                              duration: 3000,
                            });
                          }}
                        >
                          <Copy className="h-3 w-3" /> Copy text
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Rewards Program</CardTitle>
                <CardDescription>
                  Earn rewards for referring friends to our platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gradient-to-r from-primary/10 to-indigo-400/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold mb-1 flex items-center gap-2">
                    <Gift className="h-5 w-5 text-primary" /> Basic Rewards
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Get 5 free video renders for each friend who joins
                  </p>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <span>5 renders per friend</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <span>No limit on referrals</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <span>Friends get 5 renders too</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-r from-amber-500/10 to-yellow-400/10 rounded-lg p-4 border border-amber-500/20">
                  <h3 className="font-semibold mb-1 flex items-center gap-2">
                    <Medal className="h-5 w-5 text-amber-500" /> Elite Rewards
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Unlock premium benefits with 10+ referrals
                  </p>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                      <span>25% discount on premium plans</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                      <span>Priority rendering queue</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                      <span>Early access to new features</span>
                    </li>
                  </ul>
                </div>
                
                <Button className="w-full gap-2">
                  <Share2 className="h-4 w-4" /> Start Referring
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralSystem;
