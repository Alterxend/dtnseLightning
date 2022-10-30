# DTNSE

#### Description: Your task is to write a program that reads lightning events data as a stream from standard input (one lightning strike per line as a JSON object, and matches that data against a source of assets (also in JSON format) to produce an alert.

#### Requirements: 
<bl>
<li>quadkeytools: v0.0.2</li>
</bl>

#### Additional Questions: 
<ol>
<li>What is the time complexity for determining if a strike has occurred for a particular asset?:</li>
&nbsp; The time complexity of this program is O(1).

<li>If we put this code into production, but found it too slow, or it needed to scale to many more users or more 

frequent strikes, what are the first things you would think of to speed it up?</li>
&nbsp; The first thing I would do is make the process function asynchronous as possible.
</ol>

#### Notes:

<bl>
<li>Had I more time I would have liked to add a schema validator and validate inputs from asset 

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;data and lightning strike data.</li>
</bl>
