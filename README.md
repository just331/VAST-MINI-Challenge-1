 
# VAST-MINI-Challenge-1
Visualization and Visual Analytics Project 

Project Overview: https://vast-challenge.github.io/2019/MC1.html 

Demo Link: https://just331.github.io/VAST-MINI-Challenge-1/

![ScreenShot](https://github.com/just331/VAST-MINI-Challenge-1/blob/master/final_project.PNG)
## Contributions:

1. Map and scatter plot [Justin]
    1. Create a map of the town with "bubble" markers over places with reported damage/shake intensity
        1. The greater the intensity, the bigger the circle. 
        1. Assign Priority to locations (visualized via color scale on circle, blue to red).
        1. Able to hover over marker and see: location, shake intensity, and damage.
    2. Scatter Plot
        2. Used to show global overview of all the reports divided by points of interests and location    
 
2. Scatter plot and styling [Adriana] 
    2.  Nodes will be locations 
    2. Edges are reports of damage/shake intensity 
    2. Show relations and connections of damage in specific locations
    2. Scatter Plot
       2. Used to show global overview of all the reports divided by points of interests and location    
3. Database & Line Chart [Josh]
    3. Store the provided data for easy retrieval for visualizations
    3. Use API to get the data from database
    3. Line Chart 
        3. Used to show the data in a global time series
        3. Able to zoom in to see a detailed view of the specified categories              
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
## The Challenge:
In a prescient move, the city of St. Himark released a new damage reporting mobile application shortly before the earthquake. This app allows citizens to provide more timely information to the city to help them understand damage and prioritize their response. In this mini-challenge, use app responses in conjunction with shake maps of the earthquake strength to identify areas of concern and advise emergency planners.

![ScreenShot](https://github.com/just331/VAST-MINI-Challenge-1/blob/master/line_1.PNG)
1. Emergency responders will base their initial response on the earthquake shake map. Use visual analytics to determine how their response should change based on damage reports from citizens on the ground. How would you prioritize neighborhoods for response? Which parts of the city are hardest hit? Limit your response to 1000 words and 10 images.
    * We were able to determine that on day 8 and day 10 were the days of most intense damage (see figure above) by the earthquake, this is validated in our line chart that shows those two time frames as when there are peaks in reported shake intensities. This damage was mainly centered around the northern and eastern parts of the region. We suggest that emergency officials concentrate their resources around these neighborhoods, espc near the nuclear plant as that poses a danger to the public 
2. Use visual analytics to show uncertainty in the data. Compare the reliability of neighborhood reports. Which neighborhoods are providing reliable reports? Provide a rationale for your response. Limit your response to 1000 words and 10 images.
    * The uncerninty comes in when people would report damage in one area, severe damage to say power, but then 50 other people report only minor damage/shake intensity. We found that aggregating the data would be the best way to mitigate this problem of uncertinity, and pruging the outliers. 
3. How do conditions change over time? How does uncertainty in change over time? Describe the key changes you see. Limit your response to 500 words and 8 images.
    * We were unable to answer this question due to time constraints. 

