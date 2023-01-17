%%[

/* lookup subscriber key in master data extension */

if (not empty(@subscriberkey) == true and
rowcount(lookuprows('Master Subscribers', 'Subscriber Key', @subscriberkey)) >= 1)
then
set @subscriberRS = lookuprows('Master Subscribers', 'Subscriber Key', @subscriberkey)
set @Email_Status = field(row(@subscriberRS, 1), 'Email Status')
set @Email_Frequency = field(row(@subscriberRS, 1), 'Email Frequency')
set @Newsletter1 = field(row(@subscriberRS, 1), 'Newsletter1')
set @Newsletter2 = field(row(@subscriberRS, 1), 'Newsletter2')
]%%

<!DOCTYPE html>
 <html>
 <head>
  <meta charset="utf-8">
  <link href="htpps://fonts.googleapis.com/css?family=Open+Sans:300,400,600" rel="stylesheet"/>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title></title>
 </head>
 <body>
     <div class="container">
   <h1>Email Preferences</h1>
   <p>Below are your current subscriptions and preferences for the email address: %%=v(@email)=%%. You may use this page to update your selections or choose to unsubscribe from all our email communications.</p>
   <br>
   <form action="%%=cloudpagesURL('1434')=%%" method="post">
    <fieldset>
           <h2>Subscriptions</h2>

    <label for="Newsletter1"><input type="checkbox" name="Newsletter1" %%[if @Newsletter1 == true then]%%checked%%[endif]%%> Newsletter1</label>

    <label for="Newsletter2"><input type="checkbox" name="Newsletter2" %%[if @Newsletter2 == true then]%%checked%%[endif]%%> Newsletter2</label>
           
     <h2>Preferences</h2>
      
          <label for="frequency"> How many emails do you wish to receive from us?
      <select name="frequency">
      <option value =""> Please make a selection</option>
      <option value ="all" %%[if @Email_Frequency == 'all' then]%%selected%%[endif]%%> As many email as you can send me! </option>
      <option value = "medium" %%[if @Email_Frequency == 'medium' then]%%selected%%[endif]%%>>1-2 emails a week is plenty</option>
      <option value = "minimum" %%[if @Email_Frequency == 'minimum' then]%%selected%%[endif]%%>> Only the most relevant emails, 1-2 per month or less</option>
      </select>
      </label>
    <br><br>
     <label for="unsuball"><input type="checkbox" name="unsuball"> Unsubscribe me from all email communications</label>
     <input type="hidden" name="subscriberkey" value="%%=v(@subscriberkey)=%%" />
     <input type="hidden" name="email" value="%%=v(@email)=%%" />
     <input type="hidden" name="jobid" value="%%=v(@jobid)=%%" />
     <input type="hidden" name="batchid" value="%%=v(@batchid)=%%" />
     <input type="hidden" name="listid" value="%%=v(@listid)=%%" />
     <input type="hidden" name="emailName" value="%%=v(@emailName)=%%" />
     <br>
     <input type="submit" name="submit" value="Submit" />
    </fieldset>
   </form>
       
   <br>
   DEBUG:<br>
   Subscriber key: %%=v(@subscriberkey)=%%<br>
   Email: %%=v(@email)=%%<br>
   JobID: %%=v(@jobid)=%%<br>
   ListID: %%=v(@listid)=%%<br>
   BatchID: %%=v(@batchid)=%%<br>
   Frequency: %%=v(@Email_Frequency)=%%<br>   
   Newsletter1: %%=v(@Newsletter1)=%%<br>
   Newsletter2: %%=v(@Newsletter2)=%%<br>
       
  </body>
 </html>
   
%%[else]%%

You've reached this page in error
   
%%[endif]%%