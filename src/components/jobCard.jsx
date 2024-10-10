import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Heart, MapPinIcon, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { deleteJob, saveJob } from "@/api/apijobs";
import { BarLoader } from "react-spinners";

const JobCard = ({
  job,
  isMyjob = false,
  savedInit = false,
  onJobSaved = () => {},
}) => {
  const [saved, setSaved] = useState(savedInit);

  const {
    fn: fnSavedJob,
    data: savedJob,
    loading: loadingSavedJob,
  } = useFetch(saveJob, {
    alreadySaved: saved,
  });

  const { user } = useUser();

  const handleSavedJob = async () => {
    await fnSavedJob({
      user_id: user.id,
      job_id: job.id,
    });
    onJobSaved();
  };

  const { loading: loadingDeleteJob, fn: fnDeleteJob } = useFetch(deleteJob, {
    job_id: job.id,
  });

  const handleDeleteJob = async () => {
    await fnDeleteJob();
    onJobSaved();
  };

  useEffect(() => {
    if (savedJob !== undefined) setSaved(savedJob?.length > 0);
  }, [savedJob]);

  return (
    <Card className="items-center    shadow-lg rounded-lg p-4 mb-10 lg:ml-40 w-full  md:transition-transform md:hover:scale-105  transition-transform hover:scale-105 md:gap-20 xl:ml-0 ">
      {loadingDeleteJob && (
        <BarLoader className="mt-4" width={"100%"} color="blue" />
      )}
      <CardHeader className="grid grid-cols-2 ">
        <CardTitle className="text-2xl md:font-bold font-bold">
          {job.title}
        </CardTitle>
        <Trash2Icon
          fill="red"
          size={20}
          className="cursor-pointer hover:text-red-700 ml-32 sm:ml-56 md:ml-20 lg:ml-28"
          onClick={handleDeleteJob}
        />
      </CardHeader>
      <CardContent className="flex  gap-8  sm:gap-52 ">
        {job.company && (
          <img
            src={job.company.logo_url}
            alt="Company Logo"
            className="w-20 h-20  md:h-10 md:w-20 object-cover rounded-md"
          />
        )}
        <div className="flex items-center md:text-2xl  md:-ml-44 ">
          <MapPinIcon size={20} className="mr-2" /> {job.location}
        </div>
      </CardContent>
      <CardDescription className="md:text-lg text-gray-400  ">
        {job.description.substring(0, job.description.indexOf("."))}...
      </CardDescription>
      <CardFooter className="flex justify-between items-center mt-6 md:text-2xl">
        <Link to={`/job/${job.id}`} className="w-full">
          <Button variant="secondary" className="w-full lg:text-xl">
            More Details
          </Button>
        </Link>
        {!isMyjob && (
          <Button
            variant="outline"
            className="w-15"
            onClick={handleSavedJob}
            disabled={loadingSavedJob}
          >
            {saved ? (
              <Heart size={24} fill="red" stroke="red" />
            ) : (
              <Heart size={24} />
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobCard;
