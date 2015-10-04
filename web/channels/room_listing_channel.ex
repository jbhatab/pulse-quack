defmodule Quack.RoomListingChannel do
  use Phoenix.Channel
  require Logger
  require AliasMany
  AliasMany.alias [Repo, Room], from: Quack

  def join("room_listing:" <> scope, payload, socket) do
    payload = atomize_keys(payload)
    # {:ok, RoomUsers.get_room(room_name), socket}
  end

  def handle_in("msg:new" = event, payload, socket) do
    # Repo.insert! %Message{body: payload["text"]}
    # broadcast! socket, event, payload
    # {:reply, :ok, socket}
  end

  def terminate(error, socket) do
    "room_listing:" <> scope = 'all'
  end

  defp atomize_keys(struct) do
    Enum.reduce(struct, %{}, fn({k, v}, map) ->
      val = if is_map(v), do: atomize_keys(v), else: v
      Map.put(map, String.to_atom(k), val)
    end)
  end
end
