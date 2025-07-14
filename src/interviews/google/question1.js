/*
On-call Rotation

Name  | Start | End
----- | ----- | ---
Abby  | 10    | 100
Ben   | 50    | 70
Carla | 60    | 120
David | 150   | 300


Inverted:

Start | End | Names
----- | --- | ----------------
10    | 50  | Abby
50    | 60  | Abby, Ben
60    | 70  | Abby, Ben, Carla
70    | 100 | Abby, Carla
100   | 120 | Carla
150   | 300 | David

Input Format:
[
    [10, 100, Abby], [50, 70, Ben], [60, 120, Carla], [150, 300, David]
    
    [10, 20, Abby], [50, 70, Ben], [60, 120, Carla], [150, 300, David]
    
    [10, 100, Abby], [50, 120, Ben], [70, 120, Carla], [150, 300, David]
]

Output Format:
[
    {
        start: 10, 
        end: 50, 
        names: ["Abby"]
    }, 
    {
        start: 50,
        end: 60,
        names: ["Abby", "Ben"]
    }
]
*/

/* 
    Cases:
        - Disjoint intervals (currentEnd <= nextStart)
        - Joint Intervals (currentEnd > nextStart)
            - Complete overlap  (currentEnd >= nextEnd)
            - Partial overlap   (currentEnd < nextEnd)
*/

function onCallRotation(schedules) {
    const onCallSchedule = [];

    schedules.sort((a, b) => { return a[0] - b[0]});

    // const startTimes = schedules.map((x) => x[0]);
    // const endTimes = schedules.map((x) => x[1]);

    for (let i = 0; i < schedules.length; i++) {
        const currentStart = schedules[i][0];
        const currentEnd = schedules[i][1];
        const currentPerson = schedules[i][2];
        for (let j = i + 1; j < schedules.length; j++) {
            const nextStart = schedules[j][0];
            const nextEnd = schedules[j][1];
            const nextPerson = schedules[j][2];

            /*
                currentEnd <= nextStart
                    push range as start: currentStart, end: currentEnd, person: currentPerson
                    break inner loop
                currentEnd > nextStart
                    currentEnd <= nextEnd
                        
                    currentEnd > nextEnd
                        stay at i, till above if is satisfied
                        recurse into same function with 

            */
        }
    }
}
// Zero Array Transformation 1/2/3/4