docker run --name mydb -e POSTGRES_PASSWORD=postgres -p 5432:5432 postgres:9.6

CREATE table IF NOT EXISTS notifications (
   id serial PRIMARY KEY,
   msg VARCHAR ( 50 )
   
);

--inserting,to be checked on backedn
insert into notifications(msg) values('message 1')



CREATE OR REPLACE FUNCTION notify_new_permission()
  RETURNS trigger AS
$BODY$
    BEGIN
        PERFORM pg_notify('new_permission', row_to_json(NEW)::text);
        RETURN NULL;
    END; 
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
  
 
 CREATE TRIGGER notify_new_permission
  AFTER INSERT
  ON "notifications"
  FOR EACH ROW
  EXECUTE PROCEDURE notify_new_permission();



Going from db to backend

https://medium.com/@simon.white/postgres-publish-subscribe-with-nodejs-996a7e45f88


Websocket
1)Persistent TCP Connection
2)Client to server messaging not needed


Nodejs server side event
https://www.digitalocean.com/community/tutorials/nodejs-server-sent-events-build-realtime-app


https://stackoverflow.com/questions/4812686/closing-websocket-correctly-html5-javascript
window.onbeforeunload = function() {
    websocket.onclose = function () {}; // disable onclose handler first
    websocket.close();
};



Ref data
https://docs.google.com/spreadsheets/d/1ZB74W-hXJpLgt2rdfZRdlJIq_z4iejUTMB_ozWTfJDQ/edit#gid=0
FYI : Please find hub registration types in Org Registration type sheet and members types in Entityuser Role sheet from ref data workbook

Create member
/TODO:Look into it later
<div key={Math.random()}  className={classHelper("form")}>


Editdetails
TODOs
//TODO:Fetch entityStatus beforehand and if it was not ACTIVE(onboarding),
      //after making it ACTIVE,forward onboarding hub to dashboard
      //Might as well set hubcontext to new hub




Editdetails
//TODO:
  if (!edit) return <HubDetails setEdit={setEdit} orgData={orgData} />;
  //set to below to not only show editable screen(and not details screen) when entityStatus is ACTIVE
  //if (!edit && orgData.entityStatus !== "ACTIVE") return <HubDetails setEdit={setEdit} orgData={orgData} />;
  

HubDetails
//TODO: comment the following line after update org api is updated to PATCH,
      //as we dont want to redirect user to dashboard is hub entity status hasnt been set to ACTIVE
      history.push("/dashboard");
      console.log("in catch", e);

HubDetails
Remove edit from hub dropdwon for first time user

