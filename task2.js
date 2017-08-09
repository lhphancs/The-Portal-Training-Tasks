var Event = function(description, start_time, end_time)
{
    this.description = description;
    this.start_time=start_time;
    this.end_time=end_time;

    this.is_time_conflicted = function(other_event)
    {
        if(this.start_time <= other_event.start_time)
            if(other_event.start_time <= this.end_time)
                return true;
            else
                return false;
        else{
            if(this.start_time <= other_event.end_time)
                return true;
            else
                return false;
        }
    }
}

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
        var current_node = this.head;
        while(current_node.next != null){

        }
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
    new Event("Interview at The Portal", new Date(2017, 2, 23, 15, 0), new Date(2017, 2, 23, 16, 30))
    , new Event("Lunch with Cindy", new Date(2017, 2, 25, 12, 0), new Date(2017, 2, 25, 13, 0))
    , new Event("Dinner with John", new Date(2017, 2, 24, 17, 0), new Date(2017, 2, 24, 17, 30))
    , new Event("Conference", new Date(2017, 2, 24, 11, 0), new Date(2017, 2, 24, 17, 30))


    , new Event("e1", new Date(2018, 2, 24, 11, 0), new Date(2017, 2, 24, 17, 30))
    , new Event("e2", new Date(2018, 2, 24, 10, 0), new Date(2017, 2, 24, 11, 0))
    , new Event("e3", new Date(2019, 2, 24, 11, 0), new Date(2017, 2, 24, 17, 30))
    , new Event("e4", new Date(2019, 2, 24, 10, 0), new Date(2017, 2, 24, 17, 30))

];

//Create data structure and add to it
var sorted_list = new SortedList();
for(var i=0; i<event_array.length; ++i)
{
    sorted_list.add(event_array[i] );
}

sorted_list.display_all();