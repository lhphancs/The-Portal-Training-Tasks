/*
NOTE: THIS IS THE VERSION WELL-AFTER THE 1.5 HOUR MARK.
This follows the same logic as version before 1.5 hour.

For the version before 1.5, see early commits.
(Some of the latest commits are after the 1.5 hour mark)
 */

var Event = function(description, start_time, end_time)
{
    this.description = description;
    this.start_time=start_time;
    this.end_time=end_time;

    this.is_time_conflicted = function(other_event)
    {
        var earlier_event = this.start_time <= other_event.start_time?this:other_event;
        var later_event = this.start_time > other_event.start_time?this:other_event;

        if(earlier_event.end_time >= later_event.start_time)
            return true;
        else
            return false;
    }
};

var Node = function(data, next)
{
    this.data=data;
    this.next=next;
};

var SortedList = function()
{
    this.head=null;
    this.add = function(event) //adds node in sorted order with earliest start time as head
    {
        if(this.head === null)
            this.head = new Node(event, this.head);
        else if(event.start_time <= this.head.start_time)
            this.head = new Node(event, this.head);
        else
        {
            var pNode = this.head;
            var cNode = this.head.next;

            while(cNode !== null && event.start_time > cNode.start_time )
            {
                pNode = cNode;
                cNode = cNode.next;
            }
            pNode.next = new Node(event, cNode);
        }

    };

    this.get_event_conflicts = function()
    {
        var conflicted_array = [];

        var n1 = this.head;
        var n2 = n1.next;

        while(n2 !== null)
        {
            if( n1.data.is_time_conflicted(n2.data) ) //Time conflict exists
            {

                conflicted_array.push(n1);
                conflicted_array.push(n2);
                n2=n2.next;

                //If there is a conflict, create t_event that will combine the earlier start time and later end time
                /* Example of combination of event using graphical timeline...
                   |-------|        = e1
                       |-------|    = e2
                   |-----------|    = t_event
                */
                var t_event = new Event("", n1.start_time, n1.end_time>=n2.end_time?n1.end_time:n2.end_time);
                while(n2 !== null &&  t_event.is_time_conflicted(n2)) //move the n2 pointer forward to compare with n1
                {
                    conflicted_array.push(n2);
                    n2 = n2.next;
                }

            }
            n1=n2; //Move n1 pointer to current n2 since they may have conflict with further nodes.
            n2=n1.next;
        }

        return conflicted_array;
    };

    this.display_all = function()
    {
        var current_node = this.head;
        while(current_node != null){
            console.log(current_node.data.description + " " + current_node.data.start_time + " " + current_node.data.end_time);
            current_node = current_node.next;
        }
    };
};

//Create events
var event_array = [
    new Event("Interview at The Portal", new Date(2017, 2, 23, 15, 0), new Date(2017, 2, 23, 16, 30)) // 02/23/17(23:15)-02/23/17(16:30)
    , new Event("Lunch with Cindy", new Date(2017, 2, 25, 12, 0), new Date(2017, 2, 25, 13, 0)) // 02/25/17(12:00)-02/25/17(13:00)
    , new Event("Dinner with John", new Date(2017, 2, 24, 17, 0), new Date(2017, 2, 24, 17, 30)) // 02/24/17(17:00)-02/24/17(17:30)
    , new Event("Conference", new Date(2017, 2, 24, 11, 0), new Date(2017, 2, 24, 17, 30)) // 02/24/17(11:00)-02/24/17(17:30)

    , new Event("e1", new Date(2018, 2, 24, 11, 0), new Date(2018, 2, 24, 17, 30)) // 02/24/18(11:00)-02/24/18(17:30)
    , new Event("e2", new Date(2018, 2, 24, 10, 0), new Date(2018, 2, 24, 11, 0)) // 02/24/18(10:00)-02/24/18(11:00)
    , new Event("e3", new Date(2019, 2, 24, 11, 0), new Date(2019, 2, 24, 17, 30)) // 02/24/19(11:00)-02/24/19(17:30)
    , new Event("e4", new Date(2019, 2, 24, 10, 0), new Date(2019, 2, 24, 17, 30)) // 02/24/19(10:00)-02/24/19(17:30)
];

//Create data structure and add to it
var sorted_list = new SortedList();
for(var i=0; i<event_array.length; ++i)
{
    sorted_list.add(event_array[i] );
}

sorted_list.display_all();

var time_conflict_array = sorted_list.get_event_conflicts();
console.log("\n\nTime conflicts:");
console.log(time_conflict_array);

/*
NOTE: THIS IS THE VERSION WELL-AFTER THE 1.5 HOUR MARK.
This follows the same logic as version before 1.5 hour.

For the version before 1.5, see early commits.
(Some of the latest commits are after the 1.5 hour mark)
 */