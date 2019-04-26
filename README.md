# VAST-MINI-Challenge-1
Visualization and Visual Analytics Project 

https://vast-challenge.github.io/2019/MC1.html 

## The Challenge:
In a prescient move, the city of St. Himark released a new damage reporting mobile application shortly before the earthquake. This app allows citizens to provide more timely information to the city to help them understand damage and prioritize their response. In this mini-challenge, use app responses in conjunction with shake maps of the earthquake strength to identify areas of concern and advise emergency planners.

1. Emergency responders will base their initial response on the earthquake shake map. Use visual analytics to determine how their response should change based on damage reports from citizens on the ground. How would you prioritize neighborhoods for response? Which parts of the city are hardest hit? Limit your response to 1000 words and 10 images.

2. Use visual analytics to show uncertainty in the data. Compare the reliability of neighborhood reports. Which neighborhoods are providing reliable reports? Provide a rationale for your response. Limit your response to 1000 words and 10 images.

3. How do conditions change over time? How does uncertainty in change over time? Describe the key changes you see. Limit your response to 500 words and 8 images.

## The Data: 
* 83,072 rows 
* 8 columns
    * Time: Day/Month/Year/Time
    * Sewer and Water: Scale from 0 (lowest) to 10 (highest) of how bad the damage was done to specified area
    * Power: Scale from 0 (lowest) to 10 (highest) of how bad the damage was done to specified area  
    * Roads and Bridges: Scale from 0 (lowest) to 10 (highest) of how bad the damage was done to specified area 
    * Medical: Scale from 0 (lowest) to 10 (highest) of how bad the damage was done to specified area 
    * Buildings: Scale from 0 (lowest) to 10 (highest) of how bad the damage was done to specified area
    * Shake intensity: Scale from 0 (lowest) to 10 (highest) of how violent the shake was in specified area 
    * Location: id of neighborhood where person reporting is feeling the shaking and/or seeing the damage
 
## Proposed Solution:

1. Map [Justin]
    1. Create a map of the town with "bubble" markers over places with reported damage/shake intensity
        1. The greater the intensity, the bigger the circle. 
        1. Assign Priority to locations (visualized via color scale on circle, blue to red).
        1. Able to hover over marker and see: location, shake intensity, and damage.
 
2. Force Directed Graph [Adriana] 
    2.  Nodes will be locations 
    2. Edges are reports of damage/shake intensity 
    2. Show relations and connections of damage in specific locations
    
3. Database & API [Josh]
    3. Store the provided data for easy retrieval for visualizations
    3. Use API to get the data from database             