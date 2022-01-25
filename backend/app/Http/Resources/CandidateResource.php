<?php

namespace App\Http\Resources;

use App\Http\Resources\Custom\ShareResource;

class CandidateResource extends ShareResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array
     * @var  \Illuminate\Http\Request $request
     *
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'phoneNumber' => $this->phone_number,
            'address' => $this->address,
            'description' => $this->description,
            'avatarUrl' => $this->avatar_url,
            'status' => $this->status,
            'experiences' => ExperienceResource::collection($this->whenLoaded('experiences')),
            'education' => EducationResource::collection($this->whenLoaded('education')),
            'resumes' => ResumeResource::collection($this->whenLoaded('resumes')),
            'socialProfiles' => SocialProfileResource::collection($this->whenLoaded('socialProfiles')),
            'tags' => TagResource::collection($this->whenLoaded('tags')),
            'customAttributes' => CustomAttributeResource::collection($this->whenLoaded('customAttributes')),
            'managers' => ManagerResource::collection($this->whenLoaded('managers')),
            'jobs' => JobResource::collection($this->whenLoaded('jobs')),
            'stages' => StageResource::collection($this->whenLoaded('stages')),
        ];
    }
}
