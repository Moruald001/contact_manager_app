<?php

use Illuminate\Support\Facades\Auth;
use App\Models\Contact;


class ContactService {

//recuperation de tous les contacts
  public function getAllContacts(){
    //recuperation de l'utilisateur 
    $user =Auth::user();
    if(!$user){
      return[];
    }

    return Contact::where('user_id', $user->id)->orderBy('lastname')->get();
  }


  //creation d'un contact
  public function creatContact(array $data){
    $user =Auth::user();
    if(!$user){
      return null;
    }

    $data['user_id'] = $user->id;
    return Contact::create($data);
  }


  //mise à jour d'un contact
  public function updateContact(Contact $contact, array $data) {
    $user =Auth::user();
    if(!$user){
      return null;
    }

    return $contact->update($data);

  }

  public function deleteContact(Contact $contact) {
    $user =Auth::user();
    if(!$user || $contact->user_id !== $user->id){
      return false;
    }

    return $contact->delete();


  }




}