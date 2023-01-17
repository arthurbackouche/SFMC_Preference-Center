%%[

/* Get subscriber values */

set @subscriberkey = requestparameter('subscriberkey')
set @email = requestparameter('email')
set @jobid = requestparameter('jobid')
set @batchid = requestparameter('batchid')
set @listid = requestparameter('listid')
set @emailName = requestparameter('emailName')

/* Get Form values */

set @Newsletter1 = requestparameter('Newsletter1')
set @Newsletter2 = requestparameter('Newsletter2')


set @unsuball = requestparameter('unsuball')
set @frequency = requestparameter('frequency')

/* checkbox fixes */
if @Newsletter1 == 'on' then set @Newsletter1 = 'True' else set @Newsletter1 = 'False' endif

if @Newsletter2 == 'on' then set @Newsletter2 = 'True' else set @Newsletter2 = 'False' endif

if not empty(@subscriberkey) == true then
 /* processing */
 if @unsuball == 'on' then 
  /* global opt out */
  set @updateSubscriber = UpdateData('Master Subscribers', 1, 'Subscriber Key', @subscriberkey, 
  'Newsletter1', 'False', 
  'Newsletter2', 'False',
  'Email Frequency', @frequency,
  'Email Status', 'Unsubscribed'
  )
  
    /* log unsub event */
  SET @logUnsubEvent = CreateObject("ExecuteRequest")
  SetObjectProperty(@logUnsubEvent, "Name", "LogUnsubEvent")

  SET @UnsubProperty = CreateObject("APIProperty")
  SetObjectProperty(@UnsubProperty, "Name", "SubscriberKey")
  SetObjectProperty(@UnsubProperty, "Value", @subscriberKey)
  AddObjectArrayItem(@logUnsubEvent, "Parameters", @UnsubProperty)

  SET @UnsubProperty = CreateObject("APIProperty")
  SetObjectProperty(@UnsubProperty, "Name", "JobID")
  SetObjectProperty(@UnsubProperty, "Value", @jobid)
  AddObjectArrayItem(@logUnsubEvent, "Parameters", @UnsubProperty)

  SET @UnsubProperty = CreateObject("APIProperty")
  SetObjectProperty(@UnsubProperty, "Name", "ListID")
  SetObjectProperty(@UnsubProperty, "Value", @listid)
  AddObjectArrayItem(@logUnsubEvent, "Parameters", @UnsubProperty)

  SET @UnsubProperty = CreateObject("APIProperty")
  SetObjectProperty(@UnsubProperty, "Name", "BatchID")
  SetObjectProperty(@UnsubProperty, "Value", @batchid)
  AddObjectArrayItem(@logUnsubEvent, "Parameters", @UnsubProperty)

  SET @logUnsubEvent_status = InvokeExecute(@logUnsubEvent, @overallStatus, @requestId)
  SET @Status = Field(Row(@logUnsubEvent_status, 1), "StatusMessage")
  SET @Error = Field(Row(@logUnsubEvent_status, 1), "ErrorCode")
  
    if @updateSubscriber == 1 AND @Error == 0 then
   set @message = 'You have been unsubscribed'
  else
   set @message = 'An error has occured, please try again at a later time. If the problem persist please contact us through our help center.'
  endif

  ]%%
  %%=v(@message)=%%
  %%[
  

 else
  /* subscription changes */
  set @updateSubscriber = UpdateData('Master Subscribers', 1, 'Subscriber Key', @subscriberkey, 
  'Newsletter1', @Newsletter1, 
  'Newsletter2', @Newsletter2,
  'Email Frequency', @Email_Frequency
  )
  if @updateSubscriber == 1 then
   set @message = 'Your preferences have been updated.'
  else
   set @messagew = 'An error has occured'
  endif

  ]%%
  %%=v(@message)=%%
  %%[

 endif

else
 /* no subscriber key redirect */
 redirect('https://www.google.com.au/')
endif

]%%