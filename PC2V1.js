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

  <title></title>
 </head>
 <body>
     <div class="container">
   <h1>Email Preferences</h1>
   <p>Below are your current subscriptions and preferences for the email address: %%=v(@email)=%%. You may use this page to update your selections or choose to unsubscribe from all our email communications.</p>
   <br>
   <form action="%%=cloudpagesURL('2096')=%%" method="post">
    <fieldset>
           <h2>Subscriptions</h2>
           %%[
             set @subscriptionsRS = lookuporderedrows('Master_Subscriptions', 0, 'position asc', 'Display', 1)
             if rowcount(@subscriptionsRS) >= 1 then 
              /* display subscription */
              for @i = 1 to rowcount(@subscriptionsRS) do 
               set @subscriptionName = field(row(@subscriptionsRS, @i), 'SubscriptionName')
               set @subscriptionDisplayName = field(row(@subscriptionsRS, @i), 'DisplayName')
               set @subscriptionValue = lookup('Master Subscribers', @subscriptionName, 'Subscriber Key', @subscriberkey
               )
             ]%%
             <label for="%%=v(@subscriptionName)=%%"><input type="checkbox" name="%%=v(@subscriptionName)=%%" %%[if
             @subscriptionValue == true then]%%checked%%[endif]%%> %%=v(@subscriptionDisplayName)=%%</label><br>
             %%[
             
             next @i 
            endif
           ]%%
</script>

     <h2>Preferences</h2>
      
          <label for="frequency"> How many emails do you wish to receive from us?<br>
      <select name="frequency" class="frequency_">
      <option value =""> Please make a selection</option>
      <option value ="all" %%[if @Email_Frequency == 'all' then]%%selected%%[endif]%%> As many email as you can send me! </option>
      <option value = "medium" %%[if @Email_Frequency == 'medium' then]%%selected%%[endif]%%> 1-2 emails a week is plenty</option>
      <option value = "minimum" %%[if @Email_Frequency == 'minimum' then]%%selected%%[endif]%%> Only the most relevant emails, 1-2 per month or less</option>
      </select>
      </label>
                      

    <br><br>
     <label for="unsuball" class="unsuball_"><input type="checkbox" name="unsuball" > Unsubscribe me from all email communications</label>
     <input type="hidden" name="subscriberkey" value="%%=v(@subscriberkey)=%%" />
     <input type="hidden" name="email" value="%%=v(@email)=%%" />
     <input type="hidden" name="jobid" value="%%=v(@jobid)=%%" />
     <input type="hidden" name="batchid" value="%%=v(@batchid)=%%" />
     <input type="hidden" name="listid" value="%%=v(@listid)=%%" />
     <input type="hidden" name="emailName" value="%%=v(@emailName)=%%" />
     <br>
     <input type="submit" name="submit" value="Submit" class="submit_" />
    </fieldset>
   </form>
       
  </body>
 </html>
   
%%[else]%%

You've reached this page in error
   
%%[endif]%%