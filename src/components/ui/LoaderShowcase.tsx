import { LoaderOne, LoaderTwo, LoaderThree } from "@/components/ui/loader";

export function LoaderShowcase() {
  return (
    <div className="space-y-8 p-8">
      <div className="text-center">
        <h2 className="font-playfair text-2xl font-bold mb-2">Loader Components</h2>
        <p className="text-muted-foreground">Minimal and elegant loading animations</p>
      </div>
      
      <div className="grid gap-8 md:grid-cols-3">
        <div className="flex flex-col items-center gap-4 p-6 border rounded-lg">
          <h3 className="font-playfair text-lg font-semibold">LoaderOne</h3>
          <LoaderOne />
          <p className="text-sm text-muted-foreground text-center">Three bouncing dots</p>
        </div>
        
        <div className="flex flex-col items-center gap-4 p-6 border rounded-lg">
          <h3 className="font-playfair text-lg font-semibold">LoaderTwo</h3>
          <LoaderTwo />
          <p className="text-sm text-muted-foreground text-center">Horizontal moving dots</p>
        </div>
        
        <div className="flex flex-col items-center gap-4 p-6 border rounded-lg">
          <h3 className="font-playfair text-lg font-semibold">LoaderThree</h3>
          <LoaderThree />
          <p className="text-sm text-muted-foreground text-center">Lightning bolt animation</p>
        </div>
      </div>
    </div>
  );
}