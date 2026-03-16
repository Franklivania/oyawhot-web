import Navbar from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { use } from "react";

export default function InviteDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const name = "John Doe";
  return (
    <div className="w-full min-h-screen mx-auto bg-primary">
      <Navbar />

      <Card className="max-w-xl mx-auto mt-12 text-white py-10">
        <CardContent>
          <h2 className="h3 text-center text-white">
            Join {name} to play Oyawhot
          </h2>

          <div className="space-y-4 w-full mx-auto my-12">
            <h4 className="h4 text-white">Copy Code</h4>
            <div className="w-full bg-black/50 rounded-2xl flex items-center justify-between px-6 py-4">
              <span className="text-white">{slug}</span>
              <Button
                buttonStyle={{
                  bgColor: "var(--green)",
                  borderColor: "var(--green-dark)",
                  textColor: "var(--background)",
                }}
                className="text-base"
              >
                Copy Code
              </Button>
            </div>
          </div>
        </CardContent>
        <div className="w-max mx-auto">
          <Button>Download app to join</Button>
        </div>
      </Card>
    </div>
  );
}
