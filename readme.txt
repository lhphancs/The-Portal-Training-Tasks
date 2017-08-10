I chose a sorted list as my data structure, using the "start_time".
ie) If e1's start time is 9:00am, and e2's start time is 10:00am, then it links as follows:
e1->e2   (e1 is head of sorted_list)

By using a sorted list as a data structure, I can do a single pass by comparing e1's start-end value with the
next e2's start-end value. Then I can keep comparing until there's no time conflict.
Once there is no more time conflict, then I start off from the last time conflict, and continue comparing.

Since it should do it in a single pass, the time complexity should be O(n).

On edge case, if time equals in anyways, then I considered that there is an overlap.