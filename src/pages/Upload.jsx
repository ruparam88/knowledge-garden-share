
import NavBar from "@/components/NavBar";
import UploadResourceForm from "@/components/UploadResourceForm";

const Upload = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1 container mx-auto max-w-3xl py-8 px-4">
        <UploadResourceForm />
      </main>
      
      <footer className="border-t py-6 px-4">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          KnowShare © {new Date().getFullYear()} - A knowledge management system
        </div>
      </footer>
    </div>
  );
};

export default Upload;
